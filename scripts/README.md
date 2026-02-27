# Database Setup Guide

This directory contains SQL scripts to set up your Supabase database for the admin dashboard.

## Steps to Set Up

### 1. Create the Users Table
1. Go to [Supabase Dashboard](https://app.supabase.com/projects)
2. Select your project: **atutgawggyufnibgyauo**
3. Go to **SQL Editor** (left sidebar)
4. Create a new query and copy the entire content from `01-create-users-table.sql`
5. Click **Run** to execute the script
6. You should see a success message

### 2. Seed 100 Users
1. In the same **SQL Editor**, create a new query
2. Copy the entire content from `02-seed-users.sql`
3. Click **Run** to execute the script
4. This will insert 100 sample users into your database

### 3. Verify Setup
1. Go to **Table Editor** in Supabase
2. You should see a `users` table with 100 rows
3. Each user has the following fields:
   - `id` (auto-generated)
   - `first_name`
   - `last_name`
   - `email`
   - `phone` (optional)
   - `department` (optional)
   - `role` (admin, user, manager, moderator)
   - `status` (active, inactive)
   - `created_at`
   - `updated_at`

## Testing the Connection

After setup, run your Next.js app:
```bash
npm run dev
```

Navigate to the users page and you should see:
- ✅ All 100 users loaded from Supabase
- ✅ Search/filter functionality working
- ✅ Create new user functionality working
- ✅ Pagination working correctly

## Troubleshooting

**Users not showing?**
- Check browser console for errors
- Verify `.env.local` has correct Supabase URL and API key
- Check Supabase table has data: Go to Table Editor → users

**Search not working?**
- Ensure full-text search is enabled on your table
- Check Supabase logs for query errors

**Create user failing?**
- Check that email is unique (Supabase constraint)
- Verify all required fields are filled
