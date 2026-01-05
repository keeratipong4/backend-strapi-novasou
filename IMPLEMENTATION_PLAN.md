# Strapi Integration Plan

## Goal
Replace the hardcoded `MOCK_HOME_BLOCKS` in `src/app/page.tsx` with dynamic data fetched from a Strapi CMS backend.

## Architecture Overview
You will have two separate projects running side-by-side:
1.  **Frontend**: Your current Next.js application (Port 3000).
2.  **Backend**: A new Strapi application (typically Port 1337).

## User Review Required
- [ ] **Strapi Installation Directory**: I will propose installing Strapi in a sibling directory to your current project (e.g., `../novasou-cms`). Do you approve this location?
- [ ] **Database**: For simplicity, we can start with SQLite (default). Is this acceptable?

## Proposed Changes

### 1. Strapi Setup (Backend)
**Option A (Simulated Separate Sibling):**
Since I cannot access files outside your current workspace (`.../novasou-Antigravity-2`), I cannot create `../novasou-cms` directly.
**My Proposal:**
1.  I will create the project **inside** this folder as `./backend-strapi-novasou`.
2.  I will add `/backend-strapi-novasou` to your `.gitignore`.
3.  **Crucially**, I will run `git init` inside the `./backend-strapi-novasou` folder.
    *   **Result**: You will have a **Git Sub-Repository**.
    *   **Frontend Deployment**: Deploys from root (Vercel/Netlify ignores `backend-strapi-novasou` because of `.gitignore`).
    *   **Backend Deployment**: You deploy from the `backend-strapi-novasou` folder (Strapi Cloud/Heroku) using its own git history.

**Data Modeling Strategy (Atomic vs Blocks):**
To answer your question: *Yes, we will use a mix of Block and Shared Components.*
1.  **Block Components (The "Organisms")**: These map to your page sections.
    - `Hero`, `FeatureGrid`, `MediaTextSplit`, `Testimonials`.
    - These will be selectable in the `blocks` Dynamic Zone of a Page.
2.  **Shared "Micro" Components (The "Atoms/Molecules")**: These are reusable parts *inside* Blocks.
    - `Link` (label, url, variant): Used in Hero (CTA), Navbar, etc.
    - `Card` (title, description, image/icon): Used in FeatureGrid.
    - `Testimonial` (quote, author, role): Used in Testimonials block.
*This modular approach allows you to reuse the "Link" structure everywhere without redefining fields.*

- Initialize a new Strapi project: `npx -y create-strapi-app@latest backend-strapi-novasou --quickstart --no-run` inside the current directory.
- Initialize backend git repo: `cd backend-strapi-novasou && git init` to make it deployable independently.
- **STOP: I will pause here and ask for confirmation before proceeding to Content Modeling.**
- **Content Modeling**:
    - **Shared Components**: Create `elements.link`, `elements.card`, `elements.testimonial`.
    - **Block Components**: Create `blocks.hero` (uses `elements.link`), `blocks.feature-grid` (uses `elements.card`).
    - Create a **Dynamic Zone** called `blocks` inside `HomePage`.
    - Create **Components** to match your React components:
        - `Hero` (headline, subheadline, ctaText, ctaLink, etc.)
        - `FeatureGrid` (title, items array, variant)
        - `MediaTextSplit` (title, content, mediaUrl, alignment)
        - `Testimonials` (title, items array)

### 2. Frontend Integration (Current Project)
#### [src/api/strapi.ts](file:///src/api/strapi.ts) (NEW)
- specific utility functions to fetch data from Strapi API.
- Helper to resolve image URLs (Strapi returns `/uploads/...` which needs the base URL prepended).

#### [src/app/page.tsx](file:///src/app/page.tsx)
- Switch from `MOCK_HOME_BLOCKS` to `await getStrapiData()`.
- Pass the fetched data to `<BlockRenderer />`.

## Verification Plan

### Manual Verification
1.  **Start Strapi**: `npm run develop` (in backend folder).
2.  **Create Data**: Log into Strapi Admin (http://localhost:1337/admin), create a "Home Page" entry, and add some blocks (Hero, Features).
3.  **Start Frontend**: `npm run dev` (in current folder).
4.  **Verify**: Refresh localhost:3000 and confirm the content matches what was entered in Strapi.
