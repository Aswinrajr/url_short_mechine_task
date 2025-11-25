# 🔗 TinyLink - URL Shortener

<div align="center">

**Transform your long URLs into memorable short links**

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=flat-square)](https://url-short-mechine-task.vercel.app)
[![GitHub](https://img.shields.io/badge/github-repository-blue?style=flat-square)](https://github.com/Aswinrajr/url_short_mechine_task.git)

**Candidate ID:** Naukri1125

</div>

---

## 📋 Project Links

- **Live Application:** https://url-short-mechine-task.vercel.app
- **Backend API:** https://url-short-mechine-task.onrender.com
- **GitHub Repository:** https://github.com/Aswinrajr/url_short_mechine_task.git
- **Health Check:** https://url-short-mechine-task.vercel.app/healthz

---

## 🎯 Overview

TinyLink is a modern URL shortener application built with the MERN stack (MongoDB, Express, React, Node.js). Users can create short links with optional custom codes, track click analytics, and manage their links through an intuitive dashboard.

---

## ✨ Features

✅ Create short URLs with auto-generated or custom codes (6-8 characters)  
✅ Track click analytics and last clicked time  
✅ Search and filter links by code or URL  
✅ Sort links by most recent or most clicks  
✅ Delete links (returns 404 after deletion)  
✅ Copy links to clipboard with one click  
✅ Real-time statistics dashboard  
✅ System health monitoring page  
✅ Fully responsive design  
✅ 302 HTTP redirects for fast performance  

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, React Router, Tailwind CSS, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone Repository
```bash
git clone https://github.com/Aswinrajr/url_short_mechine_task.git
cd url_short_mechine_task
```

### Step 2: Backend Setup
```bash
cd server
npm install
```

Create `.env` file in `server/` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tinylink
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```
Backend runs on: **http://localhost:5000**

### Step 3: Frontend Setup
Open new terminal:
```bash
cd client
npm install
```

Create `.env` file in `client/` folder:
```env
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```
Frontend runs on: **http://localhost:5173**

### Step 4: Access Application
- **Dashboard:** http://localhost:5173
- **API:** http://localhost:5000/api/links
- **Health Check:** http://localhost:5173/healthz

---

## 📁 Project Structure
```
url_short_mechine_task/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── api/            # API calls
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   └── utils/          # Helper functions
│   └── package.json
│
└── server/                  # Node.js Backend
    ├── models/             # MongoDB models
    ├── routes/             # API routes
    ├── controllers/        # Business logic
    ├── middleware/         # Error handlers
    ├── utils/              # Utilities
    ├── server.js           # Main server
    └── package.json
```

---

## 🔌 API Endpoints

### Health Check
```http
GET /healthz
```
Returns server status, uptime, and database connection.

### Create Short Link
```http
POST /api/links
Content-Type: application/json

{
  "url": "https://example.com",
  "code": "MYCODE"  // Optional
}
```

### Get All Links
```http
GET /api/links
```

### Get Link Stats
```http
GET /api/links/:code
```

### Delete Link
```http
DELETE /api/links/:code
```

### Redirect
```http
GET /:code
```
Performs 302 redirect and increments click count.

---

## 📱 Usage

### Create a Short Link
1. Visit https://url-short-mechine-task.vercel.app
2. Enter your long URL
3. (Optional) Add custom code (6-8 alphanumeric characters)
4. Click "Shorten URL"
5. Copy the generated short link

### Use Short Link
Visit: `https://url-short-mechine-task.vercel.app/ABC123`  
Redirects to original URL and tracks click.

### View Statistics
Click the chart icon next to any link to see:
- Total clicks
- Last clicked time
- Created date
- Original URL

### Delete Link
Click the trash icon and confirm deletion.


## 🌐 Deployment

### Backend (Render)
1. Create account at https://render.com
2. New Web Service → Connect GitHub repo
3. Build Command: `cd server && npm install`
4. Start Command: `cd server && npm start`
5. Environment Variables:
```
   MONGODB_URI=your_mongodb_atlas_uri
   CLIENT_URL=https://url-short-mechine-task.vercel.app
   NODE_ENV=production
```

### Frontend (Vercel)
1. Create account at https://vercel.com
2. Import project from GitHub
3. Root Directory: `client`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Environment Variable:
```
   VITE_API_URL=https://url-short-mechine-task.onrender.com
```

### Database (MongoDB Atlas)
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP: 0.0.0.0/0
4. Get connection string
5. Add to environment variables

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=your_frontend_url
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=your_backend_url
```

---

## 📊 Features Implemented

| Feature | Status | Route/Endpoint |
|---------|--------|----------------|
| Health Check | ✅ | GET /healthz |
| Create Link | ✅ | POST /api/links |
| Custom Codes | ✅ | POST /api/links (with code) |
| Auto-generate Code | ✅ | POST /api/links (without code) |
| Get All Links | ✅ | GET /api/links |
| Get Link Stats | ✅ | GET /api/links/:code |
| Delete Link | ✅ | DELETE /api/links/:code |
| Redirect | ✅ | GET /:code |
| Click Tracking | ✅ | Increments on redirect |
| 404 After Delete | ✅ | Returns 404 for deleted links |
| 409 Duplicate Code | ✅ | Returns 409 for existing codes |
| Search/Filter | ✅ | Frontend feature |
| Sort Options | ✅ | By date or clicks |
| Dashboard | ✅ | Route: / |
| Stats Page | ✅ | Route: /code/:code |
| Responsive Design | ✅ | Mobile, Tablet, Desktop |

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check MongoDB is running
mongod --version

# Or use MongoDB Atlas connection string
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
```

### CORS Errors
Ensure `CLIENT_URL` in backend `.env` matches your frontend URL.

### Module Not Found
```bash
# Reinstall dependencies
cd server && npm install
cd client && npm install
```

---

## 👤 Author

**Candidate ID:** Naukri1125

**GitHub:** https://github.com/Aswinrajr  
**Repository:** https://github.com/Aswinrajr/url_short_mechine_task.git  
**Live Demo:** https://url-short-mechine-task.vercel.app


<div align="center">

**⭐ Star this repo if you found it helpful!**



</div>