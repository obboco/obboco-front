export const endpoints = {
  v1: {
    activity_create: '/activity',
    activity_list: '/activity/user/{partnerId}',
    event_create: '/event',
    event_list: '/event/activity/{activityId}',
    booking_event: '/booking/event/{eventId}'
  }
};
