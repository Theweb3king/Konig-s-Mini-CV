# Konigthegreat — Web3 Researcher | Ecosystem Contributor | Blockchain Gamer

A bold, modern, single-page Mini CV website showcasing the Web3 professional identity of Konigthegreat. Built with clean HTML, CSS, and lightweight JavaScript — optimized for Vercel deployment.

![Website Preview](./assets/preview.png)

## Features

- **Dark Mode Default** — Deep purple to black gradient aesthetic
- **Animated Particle Background** — Interactive starfield effect with mouse tracking
- **Glassmorphism Design** — Soft blur, transparency, and subtle glow effects
- **Fully Responsive** — Mobile-first design that adapts to all screen sizes
- **Smooth Animations** — Scroll-triggered fade-ins, hover effects, and 3D card tilts
- **Semantic HTML** — Clean, accessible structure
- **No Heavy Frameworks** — Pure vanilla HTML, CSS, and JavaScript

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, flexbox, grid, animations
- **JavaScript** — ES6+ classes, intersection observer, canvas API

## Project Structure

```
Konig-s-Mini-CV/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── script.js       # Interactive features
├── assets/             # Images, icons, avatar
└── .gitignore          # Git ignore rules
```

## Sections

1. **Hero** — Name, subtitle, CTAs, and animated avatar
2. **About** — Professional bio and background
3. **What I Do** — Three service cards (Research, Content, Gaming)
4. **Selected Work** — Four highlight cards showcasing expertise
5. **Connect** — Social links (X, Discord, Telegram, GitHub, Email)

## Local Development

To view the site locally:

```bash
# Navigate to project directory
cd Konig-s-Mini-CV

# Start a local server (Python 3)
python -m http.server 8080

# Or with Node.js
npx serve .

# Or with PHP
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update website"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Framework Preset: **Other** (static site)
   - Root Directory: `./` (default)
   - Click **Deploy**

3. **Your site is live!** Vercel will provide a URL like `https://konig-s-mini-cv.vercel.app`

### GitHub Pages (Alternative)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Source: Deploy from a branch
4. Branch: `main` / `root`
5. Click **Save**
6. Your site will be available at `https://theweb3king.github.io/Konig-s-Mini-CV/`

## Customization

### Update Content

Edit `index.html` to change:
- Name and subtitle in the Hero section
- About text
- Service offerings
- Work highlights
- Social links

### Update Styling

Edit `css/styles.css` to modify:
- Colors (CSS variables at the top)
- Typography
- Spacing
- Animations

### Add Avatar Image

1. Place your avatar image in the `assets/` folder
2. Update the Hero section in `index.html`:
   ```html
   <div class="avatar-inner">
       <img src="assets/avatar.jpg" alt="Konigthegreat" class="avatar-img">
   </div>
   ```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies (except Google Fonts)
- Optimized particle system (pauses when tab is inactive)
- Reduced motion support for accessibility
- Lightweight (~50KB total)

## License

© 2026 Konigthegreat. All rights reserved.

## Connect

- **X (Twitter):** [@konigthegreit](https://x.com/konigthegreit?s=21)
- **Discord:** konigthegreat
- **Telegram:** [@konigthegr8](https://t.me/konigthegr8)
- **GitHub:** [Theweb3king](https://github.com/Theweb3king)
- **Email:** konighandler@gmail.com
