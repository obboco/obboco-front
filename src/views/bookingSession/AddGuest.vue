<template>
  <q-page class="flex justify-center items-center bg-white" padding>
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between" style="min-width: 320px">
        <h3 class="text-2xl">Add guest</h3>
        <BackButton />
      </div>
      <ErrorNotification :error="error" />
      <div
        class="q-pa-md m-2 border border-solid rounded-md border-gray-200"
        style="max-width: 400px"
      >
        <q-form class="q-gutter-md">
          <q-input
            v-model="name"
            filled
            label="Name"
            lazy-rules
            autogrow
            :error="formErrors.get('first_name') != null"
            :error-message="formErrors.get('first_name')?.message"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            v-model="lastName"
            filled
            label="Last name"
            lazy-rules
            autogrow
            :error="formErrors.get('last_name') != null"
            :error-message="formErrors.get('lasst_name')?.message"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="email"
            filled
            lazy-rules
            autogrow
            label="Email"
            type="email"
            :error="formErrors.get('email') != null"
            :error-message="formErrors.get('email')?.message"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="phone"
            filled
            lazy-rules
            autogrow
            label="Phone"
            :error="formErrors.get('phone') != null"
            :error-message="formErrors.get('phone')?.message"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </q-form>
      </div>
      <div style="max-width: 400px">
        <q-btn
          class="float-right"
          label="Save"
          type="submit"
          color="primary"
          @click="addGuestSession"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useBookingSession } from "@/use/BookingSession";
import BackButton from "@/components/button/Back.vue";
import ErrorNotification from "@/components/notification/ErrorNotification.vue";
import router from "@/router";
import { Guest } from "@/types/Guest";
import { Partner } from "@/types/Partner";
import { ulid } from "ulid";
import { ErrorResponse, InputErrorResponse } from "@/types/Form/ErrorResponse";

const props = defineProps({
  eventId: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  initBookingSession(props.eventId);
});

const { initBookingSession, addGuest } = useBookingSession();

const name = ref<string>("");
const lastName = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const error = ref<string>("");
const formErrors = ref(new Map<string, InputErrorResponse>());

const addGuestSession = () => {
  const partner = getPartner();
  addGuest(props.eventId, {
    guest_id: ulid(),
    partner_id: partner.partner_id,
    first_name: name.value,
    last_name: lastName.value,
    email: email.value,
    phone: phone.value,
  } as Guest)
    .then(() => {
      router.push({
        name: "booking-thankyou",
        params: { eventId: props.eventId },
      });
    })
    .catch((errorResult: ErrorResponse | string) => {
      if (typeof errorResult === "string") {
        error.value = errorResult;
      } else {
        formErrors.value = errorResult.errors;
      }
    });
};

const getPartner = (): Partner => {
  return JSON.parse(localStorage.getItem("booking_session_partner")) as Partner;
};
</script>
