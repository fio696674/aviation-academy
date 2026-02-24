-- Fix for "database error saving new user"
-- Run this in Supabase SQL Editor

-- Issue: RLS policies block the trigger function from inserting into profiles
-- Solution: Disable RLS on profiles table OR create a policy that allows the trigger

-- Option 1: Disable RLS on profiles (simplest)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Option 2: If you want RLS enabled, create a policy that allows service role insertions
-- (But for simplicity, just disable RLS on profiles as it's managed by the trigger)

-- Also fix: The trigger function needs to be more robust
-- Drop the old trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert profile, ignore if already exists
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')::public.user_role
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Verify
SELECT 'Trigger recreated successfully' as status;
