# 🚀 Deployment Guide - Task Manager App

## 🌐 Vercel Deployment

This guide will help you deploy the Task Manager app to Vercel for web hosting.

### Prerequisites

- GitHub account
- Vercel account (free tier available)
- Git installed on your machine

### Step 1: Push to GitHub

1. **Ensure all changes are committed:**
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push origin master
   ```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project? `N`
   - Project name: `task-manager` (or your preferred name)
   - Directory: `./` (current directory)
   - Override settings? `N`

#### Option B: Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com) and sign in**

2. **Click "New Project"**

3. **Import your GitHub repository:**
   - Connect your GitHub account if not already connected
   - Select the `Task-Manager` repository
   - Click "Import"

4. **Configure deployment settings:**
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Click "Deploy"**

### Step 3: Verify Deployment

1. **Check build logs** for any errors
2. **Visit your deployed URL** (provided by Vercel)
3. **Test all features:**
   - Add tasks with descriptions
   - Edit existing tasks
   - Mark tasks as complete
   - Delete tasks (should work on web now!)
   - Toggle dark/light mode

### Configuration Files

The following files have been added for Vercel deployment:

#### `vercel.json`
```json
{
  "name": "task-manager",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### Updated `package.json` scripts:
- `"build": "expo export -p web --output-dir dist"`
- `"build:web": "expo export -p web --output-dir dist"`

### Environment Variables (if needed)

If you need to add environment variables:

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add your variables

2. **In Vercel CLI:**
   ```bash
   vercel env add VARIABLE_NAME
   ```

### Custom Domain (Optional)

To add a custom domain:

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

### Troubleshooting

#### Build Fails
- Check that all dependencies are in `package.json`
- Ensure `expo export` command works locally
- Check build logs for specific errors

#### App Doesn't Load
- Verify the output directory is set to `dist`
- Check that routing is configured correctly
- Ensure all assets are properly bundled

#### Features Don't Work
- Test locally with `npm run web` first
- Check browser console for errors
- Verify all imports are correct

### Performance Optimization

For better performance on Vercel:

1. **Enable compression** (automatic on Vercel)
2. **Optimize images** in the `assets` folder
3. **Use CDN** for static assets (automatic on Vercel)
4. **Enable caching** headers (configured in `vercel.json`)

### Monitoring

Monitor your deployment:

1. **Vercel Analytics** - Built-in analytics
2. **Error tracking** - Check Vercel function logs
3. **Performance** - Use Vercel Speed Insights

### Continuous Deployment

Vercel automatically deploys when you push to your main branch:

1. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin master
   ```

2. **Vercel automatically builds and deploys**

3. **Check deployment status** in Vercel dashboard

---

## 📱 Alternative Deployment Options

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Use GitHub Actions for automated deployment
3. Configure custom build workflow

### Firebase Hosting
1. Install Firebase CLI
2. Initialize Firebase project
3. Deploy with `firebase deploy`

---

## 🎉 Success!

Your Task Manager app is now deployed and accessible worldwide! 

**Live URL:** Your Vercel deployment URL will be provided after deployment.

**Features Available:**
- ✅ Add tasks with descriptions
- ✅ Edit existing tasks
- ✅ Mark tasks complete/incomplete
- ✅ Delete tasks (now working on web!)
- ✅ Dark/Light mode toggle
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Accessibility features

Share your deployed app with others and enjoy your professional task management solution! 🎊