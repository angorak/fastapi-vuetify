import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await axios.post("/api/auth/login", credentials);
        const { access_token, user } = response.data;

        this.token = access_token;
        this.user = user;
        this.isAuthenticated = true;

        localStorage.setItem("token", access_token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async register(userData) {
      try {
        const response = await axios.post("/api/auth/register", userData);
        const { access_token, user } = response.data;

        this.token = access_token;
        this.user = user;
        this.isAuthenticated = true;

        localStorage.setItem("token", access_token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      try {
        await axios.post("/api/auth/logout");
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;

        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      }
    },

    async fetchUser() {
      if (!this.token) return;

      try {
        const response = await axios.get("/api/auth/me");
        this.user = response.data;
        this.isAuthenticated = true;
      } catch (error) {
        this.logout();
      }
    },

    initializeAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        this.fetchUser();
      }
    },
  },
});
