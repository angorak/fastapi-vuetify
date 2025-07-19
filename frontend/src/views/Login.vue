<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title class="text-h5 text-center">Login</v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="form.username"
                label="Username"
                type="text"
                required
                :error-messages="errors.username"
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                required
                :error-messages="errors.password"
              ></v-text-field>

              <v-alert
                v-if="errors.general"
                type="error"
                variant="tonal"
                class="mb-4"
              >
                {{ errors.general }}
              </v-alert>

              <v-btn
                type="submit"
                color="primary"
                block
                :loading="loading"
                :disabled="loading"
              >
                Login
              </v-btn>
            </v-form>

            <div class="text-center mt-4">
              <p>
                Don't have an account?
                <router-link to="/register">Register here</router-link>
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  username: "",
  password: "",
});

const errors = reactive({
  username: "",
  password: "",
  general: "",
});

const loading = ref(false);

const handleLogin = async () => {
  // Clear previous errors
  errors.username = "";
  errors.password = "";
  errors.general = "";

  // Basic validation
  if (!form.username) {
    errors.username = "Username is required";
    return;
  }

  if (!form.password) {
    errors.password = "Password is required";
    return;
  }

  loading.value = true;

  try {
    await authStore.login({
      username: form.username,
      password: form.password,
    });

    router.push("/");
  } catch (error) {
    if (error.response?.status === 401) {
      errors.general = "Invalid username or password";
    } else {
      errors.general = "An error occurred. Please try again.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
