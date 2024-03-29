<template>
  <q-card class="m-2 rounded-md" flat bordered style="width: 334px">
    <div v-if="activity.image_id" class="image-container">
      <q-img
        :src="filesUrl(activity.image_id)"
        class="cursor-pointer"
        fit="cover"
        style="max-width: 334px; height: 334px"
        @click="goToActivityEventList(activity.activity_id)"
      />
      <div
        v-if="activity.location"
        class="text-bottom-right flex items-center bg-secondary/70 rounded-md p-1"
      >
        <q-icon size="1em" name="place" />
        {{ activity.location }}
      </div>
    </div>
    <DefaultImage
      v-else
      :activity="activity"
      class="cursor-pointer"
      @click="goToActivityEventList(activity.activity_id)"
    />

    <q-card-section horizontal>
      <div @click="goToActivityEventList(activity.activity_id)">
        <q-card-section class="q-pt-xs cursor-pointer">
          <div class="text-h5 q-mt-sm q-mb-xs">{{ activity.title }}</div>
        </q-card-section>
      </div>
      <q-space />
      <q-btn
        class="m-4"
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-section>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          {{ activity.description }}
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import { ref, PropType } from "vue";
import { Activity } from "@/types/Activity";
import DefaultImage from "@/components/activity/DefaultImage.vue";
import router from "@/router";

const props = defineProps({
  activity: {
    type: Object as PropType<Activity>,
    required: true,
  },
});

const expanded = ref<Boolean>(false);

const filesUrl = (id: string) => `${import.meta.env.VITE_API_FILES}/${id}.jpg`;

const goToActivityEventList = async (activityId: string) => {
  return router.push({
    name: "activity-events-list",
    params: { activityId: activityId },
  });
};
</script>

<style scoped>
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 60px;
}

.image-container {
  position: relative;
  text-align: center;
  color: white;
  padding-left: 0rem;
  padding-right: 0rem;
}

.text-bottom-right {
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  padding-right: 0.6rem;
}
</style>
