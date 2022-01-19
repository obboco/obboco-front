<template>
  <q-page padding class="flex justify-center bg-gray-50">
    <div class="q-pa-md flex-grow" style="max-width: 400px">
      <div class="pb-4 flex row-auto justify-between">
        <h3 class="text-2xl ml-2">Update activity</h3>
        <BackButton />
      </div>
      <ErrorNotification :error="error" />
      <div
        v-if="activity"
        class="q-pa-md pt-4 border border-solid rounded-md border-gray-200"
        style="max-width: 400px"
      >
        <q-form class="q-gutter-md pt-4">
          <q-input
            filled
            v-model="activity.title"
            label="Title"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something'
            ]"
          />

          <q-input
            filled
            v-model="activity.description"
            label="Description"
            lazy-rules
            autogrow
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something'
            ]"
          />
        </q-form>
      </div>

      <div class="pt-4" style="max-width: 400px">
        <q-btn
          @click="updateActivity"
          no-caps
          style="color: typography-primary-inverted"
          class="float-right"
          label="Save"
          type="submit"
          color="teal"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useActivity } from '@/use/Activity';
import BackButton from '@/components/button/Back.vue';
import ErrorNotification from '@/components/notification/Error.vue';
import { Activity } from '@/types/Activity';
import router from '@/router';

export default defineComponent({
  components: { BackButton, ErrorNotification },
  props: {
    activityId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { get, update } = useActivity();

    const activity = ref<Activity>();
    const error = ref<any>('');

    onMounted(() => {
      getActivity(props.activityId);
    });

    const getActivity = async (activityId: string) => {
      get(activityId)
        .then((result) => (activity.value = result))
        .catch(() => {
          return router.push({ name: 'not-found' });
        });
    };

    const updateActivity = () => {
      update(activity.value as Activity)
        .then(async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          router.push({ name: 'activity-list' });
        })
        .catch((err) => {
          error.value = err;
        });
    };
    return { activity, updateActivity, error };
  }
});
</script>