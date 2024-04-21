const { default: axios } = require("axios");

export const api = axios.create({
  baseURL:
    "https://server-wallpaper-app-git-main-thanushans-projects.vercel.app/",
});
