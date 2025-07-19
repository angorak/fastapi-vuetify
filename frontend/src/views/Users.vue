<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Users</h1>

        <v-card>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="users"
              :loading="loading"
              :items-per-page="10"
              class="elevation-1"
            >
              <template #item.created_at="{ item }">
                {{ formatDate(item.created_at) }}
              </template>

              <template #item.is_active="{ item }">
                <v-chip
                  :color="item.is_active ? 'success' : 'error'"
                  size="small"
                >
                  {{ item.is_active ? "Active" : "Inactive" }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>

        <v-alert v-if="error" type="error" variant="tonal" class="mt-4">
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const headers = [
  { title: "ID", key: "id" },
  { title: "Username", key: "username" },
  { title: "Email", key: "email" },
  { title: "Full Name", key: "full_name" },
  { title: "Status", key: "is_active" },
  { title: "Created", key: "created_at" },
];

const users = ref([]);
const loading = ref(false);
const error = ref("");

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const loadUsers = async () => {
  loading.value = true;
  error.value = "";

  try {
    await userStore.fetchUsers();
    users.value = userStore.users;
  } catch (err) {
    error.value = "Failed to load users";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadUsers();
});
</script>
