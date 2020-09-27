export const BACKEND_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://backend-onboardio.heroku-app.com"
    : "http://localhost:8080/";
export const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://onboardio.heroku-app.com/"
    : "http://localhost:3000/";
export const DISCORD_URL =
  process.env.NODE_ENV === "production"
    ? "https://onboardio.heroku-app.com/"
    : "http%3A%2F%2Flocalhost%3A3000%2F";
