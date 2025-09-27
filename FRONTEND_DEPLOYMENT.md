# Frontend Deployment Guide (GitHub Pages)

## Prerequisites
1. A GitHub account
2. Your cleaned-up project files

## Steps to Deploy to GitHub Pages

1. **Create a GitHub Repository**
   - Go to GitHub and create a new repository
   - Name it something like `music-festival-hub`
   - Don't initialize with a README

2. **Prepare Your Local Files**
   - Make sure you're in your project directory
   - Initialize git: `git init`
   - Add all files: `git add .`
   - Commit: `git commit -m "Initial commit"`

3. **Connect to GitHub**
   - Add the remote origin (replace with your repo URL):
     `git remote add origin https://github.com/yourusername/music-festival-hub.git`
   - Push to GitHub: `git push -u origin main`

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click "Save"

5. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/music-festival-hub/`
   - It may take a few minutes to deploy

## Important Notes

- GitHub Pages only serves static files (HTML, CSS, JS)
- Your backend API must be deployed separately
- Update the API base URL in [api-service.js](file:///C:/Users/Nikhil/Videos/f/web%20-%20Copy/api-service.js) after deploying your backend