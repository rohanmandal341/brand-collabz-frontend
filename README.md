# Adrovis frontend

1. Install: npm i react-router-dom lucide-react
2. Copy `src/` over your project's `src/` (remove the old AdminHub, AgenciesView, ExploreView, CampaignModal, CampaignCard files).
3. `main.jsx` should render `<App />` only. Do NOT wrap it in another BrowserRouter.
4. Copy `vercel.json` to the project root so /admin and /campaigns/:id work on refresh.
5. Set VITE_API_URL to your Render backend URL.
6. Tailwind v3 assumed. On Tailwind v4, replace the three @tailwind lines in index.css with: @import "tailwindcss";
