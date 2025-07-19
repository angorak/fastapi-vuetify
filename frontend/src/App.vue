<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>FastAPI + Vue.js App</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/users" text v-if="authStore.isAuthenticated">Users</v-btn>

      <v-btn to="/login" text v-if="!authStore.isAuthenticated">Login</v-btn>
      <v-btn to="/register" text v-if="!authStore.isAuthenticated"
        >Register</v-btn
      >

      <v-btn @click="handleLogout" text v-if="authStore.isAuthenticated"
        >Logout</v-btn
      >
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
};
</script>
