# Khyrk Shan Gula — Portfolio

A Y2K-inspired portfolio built with React, Vite, React Router and Motion.

## Run it

```bash
npm install        # first time only
npm run dev        # live preview while you edit: http://localhost:5173
npm run build      # make the finished site in the "dist" folder
npm run preview    # check the finished site: http://localhost:4173
```

`dist` is rebuilt (emptied and refilled) on every `npm run build`, so never keep your own files there.
Your original photo and logo live in `src/assets/`.

## Change your details

Everything you will want to edit is in two files:

| What | Where |
| --- | --- |
| Name, email, intro, About text, skills, interests, resume | `src/data/site.js` |
| Website projects, designs, videos | `src/data/projects.js` |

- **Email:** `email` in `src/data/site.js`. Every "Email me" button uses it.
- **Social links:** add them to `socials` in `src/data/site.js`; they appear in the footer.
- **Photo and logo:** replace `src/assets/photo1.png` and `src/assets/logo.png` with new files of the same name.
  A transparent PNG works best. The logo sits on a round black badge, so a light or coloured mark reads best.

## Add your work

All demo entries have `demo: true`, which shows a "Demo" badge. Replace them with your own work:

1. Put the file in the right folder inside `public/portfolio/`:
   - websites: `public/portfolio/web/` (a screenshot, ideally 1600 × 1000)
   - designs: `public/portfolio/design/`
   - videos and their cover images: `public/portfolio/video/`
2. In `src/data/projects.js`, copy an entry, change the text and the file name, and set `demo: false`.
3. Delete the demo entries and demo files you no longer need.

Notes:
- **Websites:** set `url` to the live site. Thumbnails and "Visit site" open it in a new tab.
- **Designs:** each design's `category` matches an `id` in `designCategories`. Each category is its own section on
  the Graphic Design page and picks a `layout`: `campaign` (ads side by side), `listing` (a product-page viewer)
  or `feed` (social post frames). Its `tools` (for example Photoshop and Canva) show on the page and in the large view.
  `label` is the style or type shown on the card. Set `width` and `height` to the image's real pixel size.
  Big PNGs load slowly: export a WebP or JPG about 1600 px wide for `image` and 800 px for `thumb`.
- **Videos:** `source` can be a video file in your site, a YouTube or Vimeo ID, an official embed URL, or a link
  to a TikTok/Instagram post (those platforms cannot play inside a normal video player). The comments above
  `videos` in `projects.js` show each option. Upright (9:16) is the default; add `aspect: '16 / 9'` for wide videos.
  Video files play in the site's own player, which pops out of the card with play/pause, seeking, a volume slider,
  mute and full screen, and remembers each visitor's volume. Give each video a `thumbnail`: a still frame
  (about 720 × 1280, WebP or JPG) shown on its card.

## Your resume

Everything is in `resume` in `src/data/site.js`:

- **The PDF:** put it in `public/` (for example `public/resume.pdf`) and set `url` to `'/resume.pdf'`.
  `fileName` is the name a visitor's download is saved as. With `url: null`, the panel shows
  "Resume PDF coming soon" instead of the "Download resume" button.
- **Education, experience, certifications:** each is a list. To add an entry, copy one and change the text;
  to remove one, delete it. Only the first field (`degree`, `role` or `name`) is required. Any entry can also
  have `details` (one short line) and `link` (turns the title into a link, for example to a certificate).
  An empty list shows "To be added".

Education and certifications appear in the Resume panel; experience has its own panel below it.

## Publishing

The work pages (`/work/web-development` and the others) must load even when someone opens or refreshes them directly.
Two hosts are already set up:

- **Netlify:** `public/_redirects` handles it.
- **Vercel:** `vercel.json` handles it.

For other hosts, configure "single-page app" mode so every path serves `index.html`.

## How the photo-to-logo animation works

`src/components/PhotoLogoTransition.jsx` draws your photo in a layer above the hero. As you scroll, the layer
flies to the round badge in the navbar, its arch frame becomes a circle, a scan line passes over it and the logo
spins in. At the end the real navbar logo takes over, so only one logo is ever visible; scrolling back up plays it
in reverse. Visitors whose device asks for reduced motion see the still photo and the navbar logo instead.
