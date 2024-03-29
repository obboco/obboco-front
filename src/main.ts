import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { loadFonts } from "@/plugins/webfontloader";
import { Quasar } from "quasar";
import quasarUserOptions from "@/quasar-user-options";
import "./assets/tailwind.css";
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import VueMixpanel from "vue-mixpanel";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

loadFonts();

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const appFirebase = initializeApp(firebaseConfig);
initializeAppCheck(appFirebase, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_FIREBASE_CAPTCHA),
  isTokenAutoRefreshEnabled: true,
});

//const analytics = getAnalytics(app);

import JsonCSV from "vue-json-csv";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

Sentry.init({
  app,
  dsn: "https://7456504253ae44be808f8fec20fa9823@o1409212.ingest.sentry.io/6745240",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["app.booking.dev:8080", "app.obboco.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app
  .use(Quasar, quasarUserOptions)
  .use(router)
  .use(pinia)
  .use(VueMixpanel, {
    token: import.meta.env.VITE_MIXPANEL_TOKEN,
  })
  .component("downloadCsv", JsonCSV)
  .mount("#app");
