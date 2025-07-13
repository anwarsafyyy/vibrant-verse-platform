-- Add missing RLS policies for authenticated users to manage data

-- Partners table policies
CREATE POLICY "Allow authenticated users to manage partners" 
ON public.partners 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow public read on partners" 
ON public.partners 
FOR SELECT 
USING (true);

-- Portfolio items table policies  
CREATE POLICY "Allow authenticated users to manage portfolio_items" 
ON public.portfolio_items 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow public read on portfolio_items" 
ON public.portfolio_items 
FOR SELECT 
USING (true);

-- Stats table policies
CREATE POLICY "Allow authenticated users to manage stats" 
ON public.stats 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow public read on stats" 
ON public.stats 
FOR SELECT 
USING (true);

-- Enable RLS on all tables if not already enabled
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;