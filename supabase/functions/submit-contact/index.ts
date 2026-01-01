import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting (per edge function instance)
// For production, consider using Upstash Redis for distributed rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5; // 5 submissions per hour per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
}

// Input validation
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  honeypot?: string; // Hidden field for bot detection
}

function validateInput(data: ContactFormData): { valid: boolean; error?: string } {
  // Check honeypot field (bots will fill this)
  if (data.honeypot && data.honeypot.length > 0) {
    console.log("Honeypot field filled - likely bot submission");
    return { valid: false, error: "Invalid submission" };
  }

  // Validate name
  if (!data.name || typeof data.name !== "string") {
    return { valid: false, error: "Name is required" };
  }
  const trimmedName = data.name.trim();
  if (trimmedName.length === 0 || trimmedName.length > 100) {
    return { valid: false, error: "Name must be between 1 and 100 characters" };
  }

  // Validate email
  if (!data.email || typeof data.email !== "string") {
    return { valid: false, error: "Email is required" };
  }
  const trimmedEmail = data.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 255) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  // Validate phone (optional)
  if (data.phone && typeof data.phone === "string" && data.phone.trim().length > 0) {
    // Basic phone validation - just check it's not too long
    if (data.phone.length > 30) {
      return { valid: false, error: "Phone number is too long" };
    }
  }

  // Validate message
  if (!data.message || typeof data.message !== "string") {
    return { valid: false, error: "Message is required" };
  }
  const trimmedMessage = data.message.trim();
  if (trimmedMessage.length === 0 || trimmedMessage.length > 1000) {
    return { valid: false, error: "Message must be between 1 and 1000 characters" };
  }

  return { valid: true };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";

    console.log(`Contact form submission from IP: ${clientIp}`);

    // Check rate limit
    if (isRateLimited(clientIp)) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { 
          status: 429, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Parse and validate request body
    const body: ContactFormData = await req.json();
    const validation = validateInput(body);

    if (!validation.valid) {
      console.log(`Validation failed: ${validation.error}`);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Create Supabase client with service role key for inserting
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into contact_inquiries table
    const { error: insertError } = await supabase
      .from("contact_inquiries")
      .insert({
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim() || null,
        message: body.message.trim(),
      });

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to submit. Please try again." }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Successfully submitted contact form from ${clientIp}`);

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully!" }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
