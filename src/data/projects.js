// All portfolio content lives in this file.
//
// Entries with demo: true are placeholders and show a "Demo" badge.
// To add your own work:
//   1. Put the image or video in public/portfolio/... (web, design or video folder)
//   2. Copy an entry, change its text and file path, and set demo: false
//   3. Delete the demo entries you no longer need
//
// File paths start from the "public" folder, e.g. 'portfolio/web/my-site.png'.

const file = (path) => `${import.meta.env.BASE_URL}${path}`

// ---------- Web development ----------
// url: the live website. Placeholder links point to example.com (a reserved
// demo address) until you replace them with your real project URLs.
// position (optional): which part of the screenshot stays visible when the card
// crops it, e.g. 'left top' or 'center top' (the default).
export const webProjects = [
  {
    id: 'grle-car-rental',
    title: 'GRLE Car Rental',
    description: 'The admin control center for a car rental business: add vehicles with photos, pricing, mileage and status, and manage bookings, live tracking, maintenance and reports.',
    image: file('portfolio/web/carrental.webp'),
    position: 'left top',
    tags: ['Admin dashboard', 'Fleet management', 'SQL'],
    url: 'https://grlebago.page.gd/',
  },
  {
    id: 'asset-tracker',
    title: 'AssetTracker',
    description: 'A school asset management system with live tracking and geofencing: every asset on a campus map, tracked rooms and labs, overdue alerts, audits and reports.',
    image: file('portfolio/web/assettracker.webp'),
    position: 'left top',
    tags: ['Geofencing', 'Live tracking', 'Asset audits'],
    url: 'https://assettracker.page.gd/',
  },
  {
    id: 'demo-campus',
    title: 'Campus Org Portal',
    description: 'A portal where students browse organisations, see upcoming events, and sign up for activities.',
    image: file('portfolio/web/demo-campus.svg'),
    tags: ['React', 'Responsive design', 'Accessibility'],
    url: 'https://example.com/',
    demo: true,
  },
  {
    id: 'demo-thread',
    title: 'Thread Studio Shop',
    description: 'An online store concept with product filters, a quick-view drawer, and a clean checkout flow.',
    image: file('portfolio/web/demo-thread.svg'),
    tags: ['HTML', 'CSS', 'E-commerce UI'],
    url: 'https://example.com/',
    demo: true,
  },
]

// ---------- Graphic design ----------
// Each category is its own section on the Graphic Design page, and its layout
// decides how the designs are shown:
//   'campaign'  ad variations side by side, each labelled with its style
//   'listing'   a product-listing viewer: one large image and a row of thumbnails
//   'feed'      square posts shown in social media post frames
// tools appear on the page and in the large view. A design can list its own
// tools to override its category's.
export const designCategories = [
  {
    id: 'advertising',
    title: 'Advertising',
    layout: 'campaign',
    description: 'One product, three art directions. The same headphones as a cinematic, a minimalist and a bold creative ad.',
    tools: ['Photoshop', 'Canva'],
  },
  {
    id: 'amazon',
    title: 'Amazon Listing Images',
    layout: 'listing',
    description: 'A complete listing set: the main image, a feature infographic, a lifestyle shot and detail callouts, made at 2000 × 2000 for zoom.',
    tools: ['Photoshop', 'Canva'],
  },
  {
    id: 'social',
    title: 'Social Media Posts',
    layout: 'feed',
    description: 'Square 1080 × 1080 posts for a feed: a product launch, a weekend promotion and the cover of a feature carousel.',
    tools: ['Photoshop', 'Canva'],
  },
]

// category: the id of a category above. label: the style or type shown on the card.
// image: the large version (about 1600 px). thumb: a smaller copy for the gallery (optional).
// width and height: the image's real pixel size, so the page keeps its shape while images load.
// Big PNGs load slowly: export a WebP or JPG around 1600 px wide for image, and 800 px for thumb.
export const designs = [
  {
    id: 'advertising-cinematic',
    category: 'advertising',
    label: 'Cinematic',
    title: 'Hear Every Moment',
    description: 'A spotlit product on black, where the headband’s silver trim and a quiet headline carry the mood.',
    image: file('portfolio/design/advertising-01-cinematic.webp'),
    thumb: file('portfolio/design/advertising-01-cinematic-thumb.webp'),
    width: 1600,
    height: 1600,
    alt: 'Black over-ear headphones under a spotlight on a black background, with the headline Hear every moment',
  },
  {
    id: 'advertising-minimalist',
    category: 'advertising',
    label: 'Minimalist',
    title: 'Sound Made Simple',
    description: 'Warm neutrals, a stone plinth and lots of space, with a short line of copy and a soft call to action.',
    image: file('portfolio/design/advertising-02-minimalist.webp'),
    thumb: file('portfolio/design/advertising-02-minimalist-thumb.webp'),
    width: 1600,
    height: 1600,
    alt: 'Headphones on a stone plinth against a beige wall, with the headline Sound made simple',
  },
  {
    id: 'advertising-bold-creative',
    category: 'advertising',
    label: 'Bold creative',
    title: 'Your Sound. Your World.',
    description: 'Electric gradients and a glowing ring turn the same product into a loud, scroll-stopping ad.',
    image: file('portfolio/design/advertising-03-bold-creative.webp'),
    thumb: file('portfolio/design/advertising-03-bold-creative-thumb.webp'),
    width: 1600,
    height: 1600,
    alt: 'Headphones framed by a glowing neon ring on a blue and purple gradient, with the headline Your sound. Your world.',
  },
  {
    id: 'amazon-main-image',
    category: 'amazon',
    label: 'Main image',
    title: 'Main Image',
    description: 'A clean product shot on pure white: the first image shoppers see in search results.',
    image: file('portfolio/design/amazon-01-main-image.webp'),
    thumb: file('portfolio/design/amazon-01-main-image-thumb.webp'),
    width: 1600,
    height: 1600,
    alt: 'Black over-ear headphones on a pure white background',
  },
  {
    id: 'amazon-feature-infographic',
    category: 'amazon',
    label: 'Infographic',
    title: 'Feature Infographic',
    description: 'Three key features with icons beside the product: wireless listening, comfortable ear cushions and easy controls.',
    image: file('portfolio/design/amazon-02-feature-infographic.webp'),
    thumb: file('portfolio/design/amazon-02-feature-infographic-thumb.webp'),
    width: 1600,
    height: 1600,
    alt: 'Infographic titled Built for everyday listening, listing wireless listening, comfortable ear cushions and easy-to-use controls beside the headphones',
  },
  {
    id: 'amazon-lifestyle-image',
    category: 'amazon',
    label: 'Lifestyle',
    title: 'Lifestyle Image',
    description: 'The product in everyday use, showing comfort during a long stretch of work at a desk.',
    image: file('portfolio/design/amazon-03-lifestyle-image.webp'),
    thumb: file('portfolio/design/amazon-03-lifestyle-image-thumb.webp'),
    width: 1600,
    height: 1600,
    alt: 'A young man wearing the headphones while working on a laptop in a bright room, with the headline Comfort that fits your day',
  },
  {
    id: 'amazon-product-details',
    category: 'amazon',
    label: 'Details',
    title: 'Product Details',
    description: 'Close-up callouts of the headband, ear cushions and controls on a dark background.',
    image: file('portfolio/design/amazon-04-product-details.webp'),
    thumb: file('portfolio/design/amazon-04-product-details-thumb.webp'),
    width: 1600,
    height: 1600,
    alt: 'Dark detail image titled Crafted in the details, with close-up callouts of the headband, ear cushions and controls',
  },
  {
    id: 'social-product-launch',
    category: 'social',
    label: 'Product launch',
    title: 'Meet Your New Everyday Headphones',
    description: 'A launch announcement with a “New” badge, a bold headline and the product’s three key traits.',
    image: file('portfolio/design/social-01-product-launch.webp'),
    thumb: file('portfolio/design/social-01-product-launch-thumb.webp'),
    width: 1080,
    height: 1080,
    alt: 'Launch post with a New badge, the headphones on black and the headline Meet your new everyday headphones',
  },
  {
    id: 'social-promotion',
    category: 'social',
    label: 'Promotion',
    title: 'Weekend Audio Event',
    description: 'A high-contrast sale post with a placeholder offer and a clear “Shop the event” call to action.',
    image: file('portfolio/design/social-02-promotion.webp'),
    thumb: file('portfolio/design/social-02-promotion-thumb.webp'),
    width: 1080,
    height: 1080,
    alt: 'Yellow promotion post reading Weekend audio event, with an XX% off placeholder offer and the headphones',
  },
  {
    id: 'social-feature-post',
    category: 'social',
    label: 'Carousel cover',
    title: '3 Details You’ll Appreciate',
    description: 'The first slide of a swipeable product guide covering comfort, controls and wireless listening.',
    image: file('portfolio/design/social-04-feature-post.webp'),
    thumb: file('portfolio/design/social-04-feature-post-thumb.webp'),
    width: 1080,
    height: 1080,
    alt: 'Carousel cover titled 3 details you’ll appreciate, with cards for comfort, controls and wireless beside the headphones',
  },
]

// ---------- Content creation (video) ----------
// source can be one of:
//   { type: 'file', src: file('portfolio/video/my-reel.mp4') }      video hosted in this site
//   { type: 'file', src: 'https://.../video.mp4' }                  direct link to a video file
//   { type: 'youtube', id: 'VIDEO_ID' }                              YouTube or YouTube Shorts
//   { type: 'vimeo', id: 'VIDEO_ID' }                                Vimeo
//   { type: 'embed', url: 'https://...', platform: 'TikTok' }        any official embed URL
//   { type: 'link', url: 'https://...', platform: 'Instagram' }      opens the original post
// TikTok and Instagram pages cannot play inside a normal video player, so use
// 'embed' with their official embed URL, or 'link' to send people to the post.
// Videos are shown upright (9:16). For a wide video add  aspect: '16 / 9'.
// thumbnail: the cover image shown before the video plays (a frame from the video works well).
export const videos = [
  {
    id: 'eclat-cinematic-commercial',
    title: 'Cinematic Commercial',
    description: 'A moody launch film for Éclat eau de parfum: a spotlit reveal, macro close-ups of the gold cap and label, drifting smoke and a “Shop now” end card.',
    thumbnail: file('portfolio/video/cinematic-commercial-poster.webp'),
    duration: '0:15',
    source: { type: 'file', src: file('portfolio/video/cinematic-commercial.mp4') },
  },
  {
    id: 'eclat-motion-graphics-ad',
    title: 'Motion Graphics Ad',
    description: 'The same perfume told through motion design: glowing rings, an exploded view of the cap, collar, atomizer and bottle, and kinetic type.',
    thumbnail: file('portfolio/video/motion-graphics-ad-poster.webp'),
    duration: '0:15',
    source: { type: 'file', src: file('portfolio/video/motion-graphics-ad.mp4') },
  },
  {
    id: 'eclat-product-showcase',
    title: 'Product Showcase',
    description: 'A bright studio take on warm cream: framing guides, a slow turn of the bottle, a focus pull to the 100 ml detail and a clean end card.',
    thumbnail: file('portfolio/video/product-showcase-poster.webp'),
    duration: '0:15',
    source: { type: 'file', src: file('portfolio/video/product-showcase.mp4') },
  },
]

// ---------- The three Work categories on the home page ----------
export const workCategories = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'Responsive websites designed to combine clean interfaces, practical functionality, and modern visual experiences.',
    tags: ['Websites', 'Front-end', 'UI'],
    previews: webProjects.slice(0, 3).map((p) => p.image),
    kind: 'web',
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    description: 'Advertising, Amazon listing images, and social media posts, designed in Photoshop and Canva.',
    tags: ['Advertising', 'Amazon listings', 'Social media'],
    // The first design of each category.
    previews: designCategories
      .map((category) => designs.find((d) => d.category === category.id))
      .filter(Boolean)
      .slice(0, 3)
      .map((d) => d.thumb ?? d.image),
    kind: 'design',
  },
  {
    slug: 'content-creation',
    title: 'Content Creation',
    description: 'Short-form video content featuring creative editing, visual storytelling, transitions, and social media-ready presentation.',
    tags: ['Commercials', 'Motion graphics', 'Product video'],
    previews: videos.slice(0, 3).map((v) => v.thumbnail),
    kind: 'video',
  },
]
