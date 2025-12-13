-- Remove the SELECT policy that exposes contact inquiries to all authenticated users
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.contact_inquiries;