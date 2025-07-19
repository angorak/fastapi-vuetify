<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-h2 mb-4">Welcome to FastAPI + Vue.js</h1>
        <p class="text-h6 mb-6">A modern full-stack application</p>

        <v-row justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-card class="pa-4">
              <v-card-title>FastAPI Backend</v-card-title>
              <v-card-text>
                <p>High-performance Python web framework</p>
                <v-btn
                  color="primary"
                  href="http://localhost:8000/docs"
                  target="_blank"
                  class="mt-2"
                >
                  View API Docs
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card class="pa-4">
              <v-card-title>Vue.js Frontend</v-card-title>
              <v-card-text>
                <p>Modern reactive JavaScript framework</p>
                <v-btn color="success" to="/users" class="mt-2">
                  Browse Users
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center" class="mt-6">
          <v-col cols="12" md="8">
            <v-alert type="info" variant="tonal">
              <template #title>Getting Started</template>
              <p>
                This application demonstrates a full-stack setup with FastAPI
                backend and Vue.js frontend. You can register new users, login,
                and view the user list.
              </p>
            </v-alert>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Home page component
</script>
