export const BACKEND_SERVER_URL = process.env.NODE_ENV === "production" ? "https://backend-onboardio.heroku-app.com" : "http://localhost:8080/";
export const CLIENT_URL = process.env.NODE_ENV === "production" ? "https://onboardio.heroku-app.com/": "http://localhost:3000/";
