# next.sett - Nail Business Websiteeeee

A modern, luxury website for next.sett nail business featuring custom press-ons, Gel-X extensions, and structured manicures.

## Features

- 🎨 **Modern Design**: Luxury aesthetic with neutral color palette
- 🌐 **Bilingual Support**: English/Spanish language toggle
- 🖼️ **Gallery Management**: Admin panel for managing nail art photos
- 📱 **Instagram Integration**: Curated Instagram post management
- 🎯 **3D Nail Customizer**: Interactive nail design tool
- 📝 **Content Management**: Editable text content via admin panel
- 📧 **Contact Forms**: Integrated contact and quote request forms
- 🔐 **Admin Dashboard**: Secure admin panel for content management
- 📱 **Mobile-First**: Fully responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js + React Three Fiber
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **File Storage**: Vercel Blob
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- MongoDB database (MongoDB Atlas recommended)
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextsett
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nextsett?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Vercel Blob (for image uploads)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@nextsett.com
ADMIN_PASSWORD=your-secure-password
```

4. Set up the database:
- Create a MongoDB Atlas cluster
- Create the following collections:
  - `users` (for admin authentication)
  - `gallery_items` (for nail art photos)
  - `instagram_posts` (for curated Instagram posts)
  - `content` (for editable text content)
  - `settings` (for app settings)

5. Create admin user:
Run the following script to create an admin user (you'll need to implement this):

```javascript
// scripts/create-admin.js
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

async function createAdmin() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  
  const db = client.db('nextsett');
  const users = db.collection('users');
  
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
  
  await users.insertOne({
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    name: 'Admin',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  console.log('Admin user created successfully');
  await client.close();
}

createAdmin();
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Panel

Access the admin panel at `/admin` with your admin credentials.

### Features:
- **Gallery Management**: Upload, edit, and organize nail art photos
- **Instagram Curation**: Add Instagram post URLs and manage visibility
- **Content Editor**: Edit website text content in both languages
- **Settings**: Manage app-wide settings and preferences

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `MONGODB_URI`
- `NEXTAUTH_URL` (your production domain)
- `NEXTAUTH_SECRET`
- `BLOB_READ_WRITE_TOKEN`

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── Navbar.tsx         # Navigation component
│   └── Footer.tsx         # Footer component
├── lib/                   # Utility functions
│   ├── auth.ts            # NextAuth configuration
│   ├── mongodb.ts         # Database connection
│   ├── language-context.tsx # Language provider
│   └── language-content.ts  # Translation content
└── types/                 # TypeScript type definitions
```

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  nude: {
    50: '#F6EDE4',
    // ... other shades
  },
  // ... other colors
}
```

### Content
Edit `src/lib/language-content.ts` to update website text content.

### Services
Update the services array in `src/lib/language-content.ts` to modify service offerings.

## Support

For questions or support, please contact:
- Email: hello@nextsett.com
- Instagram: @next.sett

## License

This project is proprietary software for next.sett nail business.