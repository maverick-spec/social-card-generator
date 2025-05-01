
# NexCard Supabase Implementation

This document tracks and explains all Supabase implementations for the NexCard application. It serves as a comprehensive guide for understanding the database structure, API functionality, and authentication mechanisms.

## Current Implementation Status

> Note: This document will be updated as Supabase features are integrated into the application.

Currently, the application is using Clerk for authentication, but plans to migrate or integrate with Supabase in the future.

## Planned Database Structure

### Users Table
Planned schema for storing user information:
```sql
create table public.users (
  id uuid references auth.users not null primary key,
  email text unique not null,
  full_name text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Create policies
create policy "Users can view their own data" on users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on users
  for update using (auth.uid() = id);
```

### Cards Table
Planned schema for storing digital business card data:
```sql
create table public.cards (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  name text not null,
  title text,
  company text,
  email text,
  phone text,
  website text,
  bio text,
  linkedin_url text,
  twitter_url text,
  github_url text,
  photo_url text,
  template_id text not null,
  custom_fields jsonb default '{}' not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.cards enable row level security;

-- Create policies
create policy "Cards are viewable by everyone" on cards
  for select using (true);

create policy "Users can insert their own cards" on cards
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own cards" on cards
  for update using (auth.uid() = user_id);

create policy "Users can delete their own cards" on cards
  for delete using (auth.uid() = user_id);
```

## Authentication Flow

The current authentication is managed by Clerk. When Supabase authentication is implemented, the following flow will be used:

1. User signs up/logs in through Supabase Auth
2. Upon successful authentication, user data is stored in the users table
3. JWT tokens are used for maintaining session state
4. Row Level Security (RLS) policies ensure users can only access their own data

## File Storage

Planned implementation for storing user profile photos and card assets:
- Storage buckets will be configured with appropriate permissions
- Images will be processed and optimized before storage
- CDN integration for faster delivery of assets

## Edge Functions

Potential edge functions to be implemented:
1. Email notifications when cards are viewed
2. QR code generation for cards
3. Analytics processing for card views and interactions

## Additional Notes

This document will be updated with each new Supabase feature implementation, including:
- SQL scripts for table creation
- Row Level Security (RLS) policies
- API endpoint details
- Authentication changes
- Storage configurations
- Edge function implementations

