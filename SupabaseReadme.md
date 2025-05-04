
# NexCard Supabase Implementation

This document tracks and explains all Supabase implementations for the NexCard application. It serves as a comprehensive guide for understanding the database structure, API functionality, and authentication mechanisms.

## Current Implementation Status

> Note: This document will be updated as Supabase features are integrated into the application.

Currently, the application uses Clerk for authentication but syncs user data to Supabase for data persistence and additional functionality.

## Database Structure

### Users Table
Schema for storing user information from Clerk:
```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  image_url TEXT,
  last_sign_in TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for secure data access
CREATE POLICY "Users can view their own data" 
  ON public.users 
  FOR SELECT 
  USING (auth.uid() = id);
  
CREATE POLICY "Users can update their own data" 
  ON public.users 
  FOR UPDATE 
  USING (auth.uid() = id);
```

### Clerk to Supabase Sync Mechanism
A trigger and function are set up to automatically sync user data from Clerk to Supabase:

```sql
-- Function to sync Clerk user data to Supabase
CREATE OR REPLACE FUNCTION public.sync_user_from_clerk()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name, image_url, last_sign_in, created_at)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'image_url',
    NEW.last_sign_in_at,
    NEW.created_at
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    image_url = EXCLUDED.image_url,
    last_sign_in = EXCLUDED.last_sign_in,
    updated_at = now();
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to execute the function on user creation/update
CREATE TRIGGER trigger_sync_user_from_clerk
AFTER INSERT OR UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.sync_user_from_clerk();
```

## API Integration

User data can be accessed through Supabase client using queries like:

```javascript
// Example of fetching user data
const fetchUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
};
```

## Future Implementations

As the application grows, additional tables and functionality will be added to the Supabase backend:
- Card data storage
- Analytics tracking
- Media storage
- API integrations
