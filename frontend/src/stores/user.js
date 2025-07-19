import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get("/api/users");
        this.users = response.data;
      } catch (error) {
        this.error = error.response?.data?.detail || "Failed to fetch users";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchUser(id) {
      try {
        const response = await axios.get(`/api/users/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async updateUser(id, userData) {
      try {
        const response = await axios.put(`/api/users/${id}`, userData);
        const updatedUser = response.data;

        // Update user in the list
        const index = this.users.findIndex((user) => user.id === id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }

        return updatedUser;
      } catch (error) {
        throw error;
      }
    },

    async deleteUser(id) {
      try {
        await axios.delete(`/api/users/${id}`);

        // Remove user from the list
        this.users = this.users.filter((user) => user.id !== id);
      } catch (error) {
        throw error;
      }
    },
  },
});
