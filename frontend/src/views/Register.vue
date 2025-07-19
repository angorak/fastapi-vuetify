<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title class="text-h5 text-center">Register</v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleRegister">
              <v-text-field
                v-model="form.username"
                label="Username"
                type="text"
                required
                :error-messages="errors.username"
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                required
                :error-messages="errors.email"
              ></v-text-field>

              <v-text-field
                v-model="form.full_name"
                label="Full Name"
                type="text"
                :error-messages="errors.full_name"
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                required
                :error-messages="errors.password"
              ></v-text-field>

              <v-text-field
                v-model="form.confirmPassword"
                label="Confirm Password"
                type="password"
                required
                :error-messages="errors.confirmPassword"
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
                Register
              </v-btn>
            </v-form>

            <div class="text-center mt-4">
              <p>
                Already have an account?
                <router-link to="/login">Login here</router-link>
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
  email: "",
  full_name: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  username: "",
  email: "",
  full_name: "",
  password: "",
  confirmPassword: "",
  general: "",
});

const loading = ref(false);

const handleRegister = async () => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  // Validation
  if (!form.username) {
    errors.username = "Username is required";
    return;
  }

  if (!form.email) {
    errors.email = "Email is required";
    return;
  }

  if (!form.password) {
    errors.password = "Password is required";
    return;
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    return;
  }

  loading.value = true;

  try {
    await authStore.register({
      username: form.username,
      email: form.email,
      full_name: form.full_name,
      password: form.password,
    });

    router.push("/");
  } catch (error) {
    if (error.response?.status === 400) {
      const data = error.response.data;
      if (data.detail) {
        errors.general = data.detail;
      } else {
        Object.keys(data).forEach((key) => {
          if (errors.hasOwnProperty(key)) {
            errors[key] = data[key];
          }
        });
      }
    } else {
      errors.general = "An error occurred. Please try again.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
