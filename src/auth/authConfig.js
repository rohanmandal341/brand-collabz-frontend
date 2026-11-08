export const AUTH_IMAGES = {
  creator: "https://media.istockphoto.com/id/1424624081/photo/group-of-casually-dressed-young-coworkers-on-meeting-discussing-ideas-at-the-office-about-new.jpg?s=170667a&w=0&k=20&c=wAx7kL9O9kzhybXYK-zQRDdMrxt4rR0HFeKYlkI6AFI=",
  brand: "https://halexo.net/wp-content/uploads/2026/04/how-msps-are-building-flexible-technical-teams-without-betting-everything-on-hiring.jpg".replace(" ", ""),
  agency: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?cs=srgb&dl=pexels-kindelmedia-7688336.jpg&fm=jpg",
};

// Paths from the Adrovis Security Swagger (v1)
export const AUTH_ENDPOINTS = {
  csrf: "/api/v1/auth/csrf",
  signup: "/api/v1/auth/signup",
  login: "/api/v1/auth/login",
  google: "/api/v1/auth/google",
  refresh: "/api/v1/auth/refresh",
  logout: "/api/v1/auth/logout",
  me: "/api/v1/auth/me",
  onboarding: "/api/v1/auth/onboarding",
  forgotPassword: "/api/v1/auth/forgot-password",
  resetPassword: "/api/v1/auth/reset-password",
  // only exist under the legacy prefix in the Swagger
  verifyEmail: "/api/auth/verify-email",
  resendVerification: "/api/auth/resend-verification",
};

export const DASHBOARD_ROUTES = {
  creator: "/creator/dashboard",
  brand: "/brand/dashboard",
  agency: "/agency/dashboard",
};

// Prod:  VITE_API_BASE_URL=https://adrovis-influencer-security.onrender.com
// Dev:   leave empty and use the Vite proxy (see notes below)
export const AUTH_API_BASE = import.meta.env.VITE_AUTH_API_URL || "https://adrovis-influencer-security.onrender.com";// Google Cloud Console -> OAuth Web client ID
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";