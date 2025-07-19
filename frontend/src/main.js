import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";
import { vuetify } from "./plugins";

// Configure axios
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
