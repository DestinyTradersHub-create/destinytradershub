-- Create contact_inquiries table for potential student leads
CREATE TABLE public.contact_inquiries (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a contact inquiry (public form)
CREATE POLICY "Anyone can submit contact inquiries"
ON public.contact_inquiries
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view inquiries (for admin follow-up)
CREATE POLICY "Authenticated users can view inquiries"
ON public.contact_inquiries
FOR SELECT
TO authenticated
USING (true);