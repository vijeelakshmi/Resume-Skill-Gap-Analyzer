# 🚀 Advanced Resume Skill Gap Analyzer

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.0.0-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-6.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-yellow.svg)

> A full‑stack web application that helps job seekers identify skill mismatches between their resumes and target job descriptions, with personalized learning recommendations and a structured roadmap.



---

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [✨ Features](#-features)
- [🛠️ Technologies Used](#%EF%B8%8F-technologies-used)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [📡 API Endpoints](#-api-endpoints)
- [🎨 UI Design](#-ui-design)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📧 Contact](#-contact)
- [🙏 Acknowledgements](#-acknowledgements)

---

## 📖 About The Project

The **Advanced Resume Skill Gap Analyzer** is a full‑stack web application that empowers job seekers, students, and career switchers to identify and bridge skill gaps between their current resume and target job descriptions.

### 🎯 What It Does

- 📄 **Upload Resume** – Supports PDF, DOC, and DOCX files.
- 🔍 **Extract Skills** – Automatically identifies technical and soft skills from resume text.
- 📊 **Analyze Gaps** – Compares extracted skills against job description requirements.
- 📈 **Visualize Results** – Displays match percentage, skill breakdown cards, and radar charts.
- 💡 **Get Recommendations** – Provides curated learning resources (GeeksforGeeks, W3Schools, MDN, YouTube) for each missing skill.
- 🗺️ **View Roadmap** – Shows a structured timeline for skill acquisition.




---

## ✨ Features

### 🔐 Authentication & Profile
- ✅ User registration and login with JWT tokens
- ✅ Password reset via email (Nodemailer)
- ✅ User profile management
- ✅ Analysis history tracking

### 📄 Resume Management
- ✅ Upload PDF, DOC, DOCX files
- ✅ Automatic text extraction (`pdf-parse`, `mammoth`)
- ✅ Skill extraction via keyword matching
- ✅ Manual skill entry as fallback

### 📊 Skill Gap Analysis
- ✅ Compare user skills vs. job requirements
- ✅ Calculate overall match percentage
- ✅ Identify matched and missing (gap) skills
- ✅ Categorize skills by domain (Programming, Frontend, Backend, Database, DevOps, etc.)

### 📈 Visual Analytics
- ✅ Radar chart comparing proficiency vs. required level (Chart.js)
- ✅ Skill breakdown cards with status (Strong Match / Good Match / Missing)
- ✅ Stats cards (Your Skills, Required Skills, Matched Skills, Skill Gaps)

### 💡 Personalized Recommendations
- ✅ Curated resources from GeeksforGeeks, W3Schools, MDN, YouTube
- ✅ Fallback to generic search links
- ✅ Refresh recommendations on demand

### 🗺️ Learning Roadmap
- ✅ Dynamic timeline based on skill gaps
- ✅ Estimated duration for each phase

### 🎨 UI / UX
- ✅ Fully responsive design
- ✅ Modern gradients and card layouts
- ✅ Font Awesome icons
- ✅ Smooth animations and transitions

---

## 🛠️ Technologies Used

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, Vite, Chart.js 4, Axios, React Router DOM 6, Socket.io-client, React Hot Toast |
| **Backend** | Node.js 18+, Express.js 4, MongoDB (Mongoose 7), JWT, Bcryptjs, Multer, Nodemailer |
| **File Parsing** | pdf-parse (PDF), mammoth (DOC/DOCX) |
| **Real-time** | Socket.io (WebSocket) |
| **Styling** | CSS3, Font Awesome 6 |
| **Development** | Nodemon, Postman, Git, VS Code |

---

## 📁 Project Structure
backend
frontend



---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud – MongoDB Atlas)
- **npm** or **yarn**

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/resume-skill-gap-analyzer.git
cd resume-skill-gap-analyzer