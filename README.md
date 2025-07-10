# StudyNext - BCA Learning Platform 🎓

A comprehensive web application designed to empower BCA (Bachelor of Computer Applications) students with semester-wise resources, study materials, and AI-powered learning assistance.

![StudyNext Platform](https://img.shields.io/badge/Next.js-14.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-8.5.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Live Demo

[View Live Application](https://your-deployment-url.com)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features Implementation](#-key-features-implementation)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Performance Optimizations](#-performance-optimizations)
- [Future Enhancements](#-future-enhancements)

## ✨ Features

### 🎯 Core Features
- **Semester-wise Resource Organization**: Structured content for each BCA semester
- **PDF Document Viewer**: Integrated PDF viewing with React PDF Viewer
- **AI-Powered Chatbot**: Google Generative AI integration for subject-specific assistance
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **YouTube Channel Integration**: Curated learning playlists and channel recommendations
- **Previous Year Questions (PYQ)**: Comprehensive question bank for exam preparation

### 🎨 User Experience
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Progressive Web App**: Fast loading and offline capabilities
- **Accessibility**: WCAG compliant design patterns
- **Cross-platform**: Works seamlessly on desktop, tablet, and mobile

### 🔧 Technical Features
- **Server-Side Rendering**: Next.js 14 with App Router
- **Database Integration**: MongoDB with Mongoose ODM
- **Authentication**: Clerk.js integration for user management
- **Real-time Chat**: WebSocket-based chatbot interface
- **Image Optimization**: Next.js Image component for performance

## 🛠 Tech Stack

### Frontend
- **Next.js 14.2.4** - React framework with App Router
- **React 18** - UI library with hooks and concurrent features
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Backend & Database
- **MongoDB 8.5.0** - NoSQL database
- **Mongoose 8.5.0** - MongoDB object modeling
- **Next.js API Routes** - Serverless API endpoints

### AI & External Services
- **Google Generative AI** - AI-powered chatbot
- **Clerk.js** - Authentication and user management
- **React PDF Viewer** - PDF document rendering

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **pnpm** - Fast package manager

## 🏗 Architecture

```
studynext/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── lib/               # Database models and utilities
│   ├── ui/                # Reusable UI components
│   └── semesters/         # Dynamic semester pages
├── components/            # React components
│   ├── chatbot/          # AI chat components
│   └── ui/               # UI component library
├── public/               # Static assets
└── middleware.js         # Next.js middleware
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/studynext.git
   cd studynext
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLERK_SECRET_KEY=your_clerk_secret
   GOOGLE_AI_API_KEY=your_google_ai_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

### Key Directories

- **`app/`** - Next.js 14 App Router structure
  - `api/` - REST API endpoints
  - `lib/` - Database models and utilities
  - `ui/` - Reusable UI components
  - `semesters/` - Dynamic semester pages with `[subject_id]` routing

- **`components/`** - React components
  - `chatbot/` - AI chat interface components
  - `ui/` - UI component library with Radix UI

- **`public/assets/`** - Static images and SVG assets

## 🔑 Key Features Implementation

### 1. Dynamic Routing with Next.js 14
```jsx
// app/semesters/[subject_id]/page.jsx
const SubjectPage = async ({ params }) => {
  const { subject_id } = params;
  const data = await getSubjectData(subject_id);
  // Renders subject-specific content
};
```

### 2. AI-Powered Chatbot
```jsx
// components/chatbot/Chat.jsx
// Integrates Google Generative AI for subject-specific assistance
// Real-time chat interface with context awareness
```

### 3. PDF Viewer Integration
```jsx
// app/ui/pdfViewer/PdfViewer.jsx
// React PDF Viewer for seamless document viewing
// Supports zoom, navigation, and search functionality
```

### 4. Responsive Design
```css
/* Mobile-first approach with Tailwind CSS */
.className="w-full pt-[20px] mb-12 md:mb-0 md:pt-6 md:min-h-[700px]"
```

## 🔌 API Endpoints

### Chat API
- `POST /api/chat` - AI chatbot responses
- `POST /api/insertData` - Data insertion utilities

### Data Fetching
- `getSemData(sem)` - Fetch semester-specific data
- `getSubjectData(id)` - Fetch individual subject details

## 🗄 Database Schema

### Subjects Collection
```javascript
{
  id: Number,           // Subject identifier
  title: String,        // Subject title
  text: String,         // Subject description
  backgroundUrl: String, // Subject image
  pdf: String,          // PDF document URL
  url: [String],        // YouTube channel URLs
  channelName: [String], // Channel names
  videoLink: [String],  // Video playlist links
  zoom: Number          // PDF zoom level
}
```

## ⚡ Performance Optimizations

### 1. Next.js Optimizations
- **App Router**: Latest Next.js 14 routing system
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic route-based code splitting

### 2. Database Optimizations
- **Indexing**: Efficient MongoDB queries
- **Connection Pooling**: Optimized database connections
- **Caching**: Strategic data caching

### 3. Frontend Optimizations
- **Tailwind CSS**: Utility-first CSS for smaller bundle sizes
- **Component Optimization**: Reusable, optimized components
- **Lazy Loading**: On-demand component loading

## 🔮 Future Enhancements

### Planned Features
- [ ] **User Authentication**: Student login and progress tracking
- [ ] **Progress Analytics**: Learning progress visualization
- [ ] **Offline Support**: PWA capabilities for offline access
- [ ] **Study Planner**: Personalized study schedules
- [ ] **Discussion Forum**: Student collaboration platform

### Technical Improvements
- [ ] **Performance Monitoring**: Real-time performance metrics
- [ ] **SEO Optimization**: Enhanced search engine visibility
- [ ] **Testing Suite**: Comprehensive unit and integration tests
- [ ] **CI/CD Pipeline**: Automated deployment workflow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer


## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Google AI** - For the generative AI capabilities
- **MongoDB** - For the flexible NoSQL database
- **Clerk** - For authentication services

---

⭐ **Star this repository if you found it helpful!**

---

*Built with ❤️ for BCA students worldwide*
