# 🚀 Deployment Guide

## Pre-Deployment Checklist
- [x] Local build successful (`npm run build`)
- [x] Code committed to git
- [ ] GitHub repository created and code pushed
- [ ] Vercel account ready

## Vercel Deployment Steps

### 1. GitHub Setup
1. Create new repository on GitHub: `nextjs-todo-app`
2. Set to Public (required for free Vercel)
3. Run: `git remote add origin https://github.com/YOUR_USERNAME/nextjs-todo-app.git`
4. Run: `git push -u origin main`

### 2. Vercel Deployment
1. Go to [vercel.com](https://vercel.com)
2. "Add New Project" → Import from GitHub
3. Select `nextjs-todo-app` repository
4. Configure environment variables:

```env
DATABASE_URL=file:./prod.db
NEXTAUTH_SECRET=iAJ157zyqnxb5AjhjVoEqGmaCNL2IjN7v3ZSz2yHR54=
NEXTAUTH_URL=https://your-app-name.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id-from-console
GOOGLE_CLIENT_SECRET=your-google-client-secret-from-console
```

**📝 Note**: Use your actual Google OAuth credentials from your `.env.local` file for the Google Client ID and Secret values in Vercel.

5. Click "Deploy"

### 3. Post-Deployment
1. Update Google OAuth settings:
   - Add production URL to authorized redirect URIs
   - Format: `https://your-app-name.vercel.app/api/auth/callback/google`
2. Test authentication and functionality
3. Your app is live! 🎉

## Environment Variables Reference

For Vercel deployment, you'll need these environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | SQLite database path | `file:./prod.db` |
| `NEXTAUTH_SECRET` | Random secret for NextAuth | Generated secure string |
| `NEXTAUTH_URL` | Your app's production URL | `https://yourapp.vercel.app` |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console | Your OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console | Your OAuth Client Secret |

## Troubleshooting

### If build fails:
- Check environment variables are set correctly
- Ensure all secrets are added to Vercel dashboard

### If authentication fails:
- Verify Google OAuth redirect URI includes production domain
- Check NEXTAUTH_URL matches your deployed domain

### If database issues:
- SQLite will work on Vercel for development
- For production scale, consider PostgreSQL

## Your App URLs
- **Local**: http://localhost:3000
- **Production**: https://your-app-name.vercel.app (Vercel will provide this)

---

**🎉 Congratulations! Your full-stack Next.js Todo App is now deployed!** 