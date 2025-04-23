<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-8">My Events</h1>

    <UiTabs defaultValue="attending" class="mb-8">
      <UiTabsList>
        <UiTabsTrigger value="attending">Attending</UiTabsTrigger>
        <UiTabsTrigger value="organizing">Organizing</UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent value="attending">
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UiSkeleton v-for="i in 4" :key="i" class="h-[300px] rounded-xl" />
        </div>

        <div v-else-if="attendingEvents.length === 0" class="text-center py-12 bg-muted rounded-lg">
          <Icon name="heroicons:calendar-days" class="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 class="text-xl font-medium mb-2">No events found</h3>
          <p class="text-muted-foreground mb-6">You're not attending any events yet</p>
          <UiButton asChild>
            <NuxtLink to="/events">
              Browse Events
            </NuxtLink>
          </UiButton>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard v-for="event in attendingEvents" :key="event.id" :event="event" />
        </div>
      </UiTabsContent>
      <UiTabsContent value="organizing">
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UiSkeleton v-for="i in 4" :key="i" class="h-[300px] rounded-xl" />
        </div>

        <div v-else-if="organizingEvents.length === 0" class="text-center py-12 bg-muted rounded-lg">
          <Icon name="heroicons:calendar-days" class="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 class="text-xl font-medium mb-2">No events found</h3>
          <p class="text-muted-foreground mb-6">You're not organizing any events yet</p>
          <UiButton asChild>
            <NuxtLink to="/create">
              Create Event
            </NuxtLink>
          </UiButton>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard v-for="event in organizingEvents" :key="event.id" :event="event" />
        </div>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script setup>
import { useEventStore } from '~/stores/event'
import { useUserStore } from '~/stores/user'

definePageMeta({
  middleware: ['auth']
})

const eventStore = useEventStore()
const userStore = useUserStore()
const { isLoading } = storeToRefs(eventStore)

// In a real app, these would be filtered based on user data from the API
// For now, we'll simulate this with mock data
const attendingEvents = computed(() => {
  // Randomly select 2 events as "attending"
  return eventStore.events.slice(0, 2)
})

const organizingEvents = computed(() => {
  // Filter events where the current user is the organizer
  return eventStore.events.filter(event =>
    event.organizer === userStore.user?.name
  )
})

onMounted(async () => {
  if (eventStore.events.length === 0) {
    await eventStore.fetchEvents()
  }
})
</script>