# acceptance-web-app-pro

## Overview

This is a defects management and acceptance testing web application built with Next.js and Supabase. The application allows users to view, filter, and export defects data in a tabular format. It provides functionality to manage construction or quality control defects with detailed information including problem descriptions, solutions, severity levels, and associated media files.

The application features a responsive interface for browsing defects with advanced filtering capabilities, user authentication via Supabase Auth, and export functionality to DOCX and XLSX formats. Users can also view detailed defect pages with associated measurements and photo galleries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: Next.js 13 with App Router architecture
- **Styling**: Tailwind CSS for responsive design and utility-first styling
- **State Management**: React Context API for filters and selection state management
- **TypeScript**: Used throughout for type safety and better development experience

### Backend Architecture

- **API Routes**: Next.js API routes for export functionality (DOCX/XLSX generation)
- **Database Integration**: Direct client-side queries to Supabase using the JavaScript client
- **Authentication**: Supabase Auth with magic link email authentication

### Data Storage Solutions

- **Primary Database**: Supabase (PostgreSQL) with custom views for data aggregation
- **File Storage**: Supabase Storage for media files (photos, documents)
- **Database Views**:
  - `defects_view_v2` for paginated defects listing
  - `defects_full_v2` for detailed defect information
- **Key Tables**:
  - `defects` - main defects data
  - `countries`, `blocks`, `defect_types` - hierarchical categorization
  - `severity_levels` - defect severity classification
  - `locations`, `location_categories` - spatial organization
  - `media_files` - associated photos and documents
  - `defect_measurements` - measurement data

### Authentication and Authorization

- **Provider**: Supabase Auth
- **Method**: Magic link email authentication (passwordless)
- **Row Level Security**: Implemented through Supabase policies
- **User Session**: Managed client-side with automatic token refresh

### Component Architecture

- **Context Providers**: FiltersContext for centralized filter state
- **Reusable Components**:
  - FiltersBar for dynamic filtering interface
  - DefectsTable for paginated data display
  - ActionsBar for bulk operations
  - Gallery for media file display with signed URLs
- **Page Structure**: App Router with nested layouts and dynamic routes

## External Dependencies

### Core Services

- **Supabase**: PostgreSQL database, authentication, file storage, and real-time subscriptions
- **Next.js**: React framework with server-side rendering and API routes

### Third-party Libraries

- **docx**: Document generation for DOCX export functionality
- **xlsx**: Spreadsheet generation for XLSX export functionality
- **@supabase/supabase-js**: Official Supabase JavaScript client library
- **Tailwind CSS**: Utility-first CSS framework for styling

### Development Dependencies

- **TypeScript**: Static type checking
- **PostCSS**: CSS processing with Autoprefixer
- **React**: UI library with hooks for state management

### Environment Configuration

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key for client-side access

### File Export System

- Server-side generation of DOCX files using the docx library
- XLSX export using the xlsx library for spreadsheet format
- Dynamic file download through API routes with proper content headers
