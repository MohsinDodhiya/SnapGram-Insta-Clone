# SnapGram - A Modern Social Media App Clone 🌐

![SnapGram Banner](./images/banner.png)

**SnapGram** is a high-performance **social media app clone** inspired by popular platforms like Instagram. Built with a cutting-edge stack (React.js, Appwrite, ShadCN, TanStack Query, and Zod), this project showcases modern features like **real-time data fetching**, **drag-and-drop uploads**, and **infinite scrolling**.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://social-media-mohsin-dodhiya-1m8pmbjwa.vercel.app/)  
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)  
[![Frontend](https://img.shields.io/badge/Frontend-ReactJS-blue)](https://reactjs.org/)  
[![Backend](https://img.shields.io/badge/Backend-Appwrite-orange)](https://appwrite.io/)  

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Screenshots](#screenshots)
5. [Getting Started](#getting-started)
6. [Usage](#usage)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)
9. [SEO and Social Sharing](#seo-and-social-sharing)
10. [License](#license)
11. [Acknowledgements](#acknowledgements)

---

## 🔍 Overview

SnapGram is a full-stack **React.js social media application** designed to enable users to share media posts, interact with others, and enjoy a streamlined, intuitive UI. With SnapGram, you can upload images, scroll endlessly through a feed, view profiles, and much more. The app is hosted on Vercel, with a fully integrated backend powered by Appwrite.

---

## ✨ Features

- **User Authentication**: Secure signup and login through Appwrite.
- **Post Sharing**: Upload and share posts with drag-and-drop support via Dropzone.
- **Infinite Scrolling**: A smooth and efficient experience with Intersection Observer and React Query.
- **Real-Time Updates**: Get instant data updates, enabled by TanStack Query.
- **Form Validation**: Zod-powered schema validation for reliable form inputs.
- **Responsive Design**: Optimized for all screen sizes using ShadCN's UI components.
- **Global State Management**: Efficiently handle global states with React Context API.
- **Drag-and-Drop Media Upload**: Built with React Dropzone for intuitive media sharing.

---

## 🛠 Tech Stack

### Frontend

- **[React.js](https://reactjs.org/)** - Core framework for building user interfaces.
- **[ShadCN](https://shadcn.dev/)** - Stylish, accessible UI components for responsive design.
- **[Context API](https://reactjs.org/docs/context.html)** - Lightweight state management for global app state.
- **[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)** - Handles infinite scrolling with efficiency.
- **[React Hook Form](https://react-hook-form.com/)** - Simplifies form management.
- **[Zod](https://zod.dev/)** - Ensures form validation is reliable and secure.
- **[Dropzone](https://react-dropzone.js.org/)** - Provides drag-and-drop functionality for uploading files.
- **[TanStack Query](https://tanstack.com/query)** - Manages state, data fetching, and caching.

### Backend

- **[Appwrite](https://appwrite.io/)** - A complete backend-as-a-service for user authentication, database, and storage management.

---

## 📸 Screenshots

### Home Feed
![Home Feed](./images/home-feed.png)

### Post Upload
![Post Upload](./images/post-upload.png)

### User Profile
![User Profile](./images/user-profile.png)

---

## 🛠 Getting Started

### Prerequisites

Ensure you have Node.js and npm installed. You’ll also need to configure an Appwrite instance or use Appwrite Cloud.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MohsinDodhiya/SnapGram-Insta-Clone.git
   cd SnapGram-Insta-Clone
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Appwrite**:
   - Set up [Appwrite](https://appwrite.io/) for authentication, storage, and database management.
   - Create an `.env` file at the root of your project and add your Appwrite credentials:
     ```env
     REACT_APP_APPWRITE_PROJECT_ID=your_project_id
     REACT_APP_APPWRITE_ENDPOINT=your_appwrite_endpoint
     ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🎮 Usage

### Adding a New Post

1. Go to the "Add Post" section.
2. Drag and drop an image or select it from your device.
3. Add a caption and submit.

### Viewing the Feed

Scroll through the home feed to see posts from users. Infinite scrolling allows you to explore without interruptions.

### Profile Management

Visit your profile to view or manage your posts and update your details.

---

## 📂 Folder Structure

```plaintext
SnapGram-Insta-Clone/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Global state management files
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Main pages (Home, Profile, etc.)
│   ├── styles/           # Global and component-specific styles
│   └── utils/            # Helper functions and constants
└── .env                  # Environment variables
```

---

## 🤝 Contributing

Contributions are welcome! Here’s how you can help:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add YourFeature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

---

## 📈 SEO and Social Sharing

To make SnapGram more discoverable, we've optimized this README with keywords like **React social media app**, **Appwrite integration**, **drag-and-drop uploads**, and **real-time data fetching**. Additionally:

- **Repository Topics**: Ensure your repository includes topics such as `social-media`, `reactjs`, `appwrite`, `full-stack`, `infinite-scrolling`, `drag-and-drop`, `responsive-design`.
- **Social Preview Image**: Use a `social-preview.png` in your repository to enhance link previews when sharing.
- **Backlinks**: Write articles about SnapGram on blogs or tech platforms, linking back to this repository.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 🙌 Acknowledgements

- Thanks to the [Appwrite](https://appwrite.io/) team for providing a powerful backend.
- Appreciation to the creators of [TanStack Query](https://tanstack.com/query), [React](https://reactjs.org/), and other libraries that made this project possible.

---

Happy Coding! 🎉
```

### Additional Notes:

1. **SEO Keywords**: This README incorporates SEO terms relevant to social media apps and full-stack development, which can increase discoverability.
2. **Social Sharing**: Use a visually appealing `social-preview.png` file at the root of the repo for link previews.
3. **Replace Image Placeholders**: Use actual images for the banners and screenshots in the respective paths (`./images/...`). If you don’t have them, consider taking screenshots of your app’s key pages and saving them in the `images` folder.

This README should enhance your project's SEO and make it more attractive to potential collaborators and users. Let me know if you'd like further customizations!
