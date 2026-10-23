# Edwin Safo portfolio

Next.js (App Router) + TypeScript + Tailwind CSS + Motion + Lenis. Contact form via Resend. Hosted on Vercel.

All copy, links, projects, skills, facts and FAQ live in `lib/content.ts`. Colours and easing live in `app/globals.css` and `lib/motion.ts`.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then add your RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

## Before you launch (Edwin supplies)

Run `npm run check:launch`. It lists every item still open:

- `public/Edwin-Safo-CV.pdf` (the Download CV button and footer link stay hidden until it exists)
- `public/edwin.jpg` (portrait, 4:5 works best; a placeholder shows until it exists)
- Project screenshots in `public/projects/`, then set `image` on the project in `lib/content.ts`
- `liveUrl` / `repoUrl` per project (links stay hidden until set)
- Stack tags for GT Vote, Ticketing platform, Tiny Sparkles, GSES (plus its live link), Cyber Pulse, and details for the Chat app
- Internship dates, and the other two LinkedIn certifications
- Verification links for credentials (`url` on the experience items)

To make the check fail instead of warn (for example in CI), run `STRICT_LAUNCH=1 npm run check:launch`.

## Verify locally (all must pass)

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start    # test the production build, the contact form and reduced-motion mode
```

## Deploy to Vercel

1. **Push to GitHub.** `git init`, `git add .`, `git commit -m "Initial commit"`, create a new repo named `portfolio`, then `git remote add origin <url>` and `git push -u origin main`. `.env*.local` is ignored by `.gitignore`.
2. **Import into Vercel.** Sign in with GitHub, click Add New Project, pick the `portfolio` repo. Leave the build settings at their defaults (Next.js is detected).
3. **Add environment variables** (Project Settings, Environment Variables) for Production and Preview: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Redeploy after adding them.
4. **Deploy**, then test the live `*.vercel.app` URL: every section, the CV download, the contact form (check the email arrives) and mobile smoothness on a real phone.
5. **Custom domain (recommended).** Add it in Settings, Domains. Set the DNS records Vercel shows (A record for the root, CNAME for www). Then change `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy. Once the domain is verified in Resend, change `CONTACT_FROM_EMAIL` to an address on it.
6. **Analytics.** Open the Analytics tab in the Vercel project and enable it. `@vercel/analytics` is already in the layout.
7. **Automatic deploys.** Every push to `main` goes to production. Every pull request gets a preview URL.
8. **Google Search Console.** Verify the domain and submit `/sitemap.xml`.

## Notes

- Dark mode: the toggle in the navbar saves the choice in localStorage. On the first visit it follows the system setting. Colours for both themes are CSS variables at the top of `app/globals.css`.
- Pointer: on desktop with a mouse, a small dot and a trailing ring replace the native arrow (after the first mouse move). Touch devices and reduced-motion users keep the normal cursor. Text fields keep the text cursor. Remove `<Cursor />` from `components/ClientExtras.tsx` to turn it off.
- Hero photo: `public/hero.jpg`. Swap the file to change it (a dark scrim keeps the white text readable).
- Fonts load with `next/font/google` and are self-hosted at build time, so the build machine needs internet access to fonts.googleapis.com (Vercel has it).
- The navbar pill uses `layoutId` (Motion `domMax`), loaded as a separate async chunk so the first load stays light.
- TypeScript is on 6.x because the ESLint TypeScript plugin does not support 7 yet. Move to 7 when `typescript-eslint` does.
- The contact rate limit is in memory (5 requests per 10 minutes per IP). On serverless it resets per instance; use a shared store such as Upstash Redis if you need a strict limit.
- The intro plays once per session on every screen size. It is skipped only for reduced motion.
