<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Events Near You
          </h1>
          <p class="text-xl mb-8 text-muted-foreground">
            Find and join events that match your interests, or create your own and connect with like-minded people.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UiButton size="lg" asChild>
              <NuxtLink to="/events">
                Browse Events
              </NuxtLink>
            </UiButton>
            <UiButton size="lg" variant="outline" asChild>
              <NuxtLink to="/create">
                Create Event
              </NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Events Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold">Featured Events</h2>
          <NuxtLink to="/events" class="text-primary hover:underline">
            View All
          </NuxtLink>
        </div>
        
        <div v-if="isLoading" class="flex justify-center py-12">
          <UiSkeleton class="h-[300px] w-full max-w-md rounded-xl" />
        </div>
        
        <div v-else-if="featuredEvents.length === 0" class="text-center py-12">
          <p class="text-xl text-muted-foreground">No events found</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EventCard 
            v-for="event in featuredEvents" 
            :key="event.id" 
            :event="event" 
          />
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-muted">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink 
            v-for="category in categories" 
            :key="category.name" 
            :to="`/events?category=${category.name}`"
            class="bg-card hover:bg-card/80 rounded-lg p-6 text-center transition-colors"
          >
            <div class="flex justify-center mb-4">
              <Icon :name="category.icon" class="w-12 h-12 text-primary" />
            </div>
            <h3 class="font-medium">{{ category.name }}</h3>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary text-primary-foreground">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Host Your Own Event?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Create and manage your events with our easy-to-use platform. Reach a wider audience and make your event a success.
        </p>
        <UiButton size="lg" variant="secondary" asChild>
          <NuxtLink to="/create">
            Get Started
          </NuxtLink>
        </UiButton>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useEventStore } from '~/stores/event'

const eventStore = useEventStore()
const { isLoading } = storeToRefs(eventStore)
const featuredEvents = computed(() => eventStore.getFeaturedEvents)

const categories = [
  { name: 'Technology', icon: 'heroicons:computer-desktop' },
  { name: 'Music', icon: 'heroicons:musical-note' },
  { name: 'Business', icon: 'heroicons:briefcase' },
  { name: 'Art', icon: 'heroicons:paint-brush' },
  { name: 'Food', icon: 'heroicons:cake' },
  { name: 'Health', icon: 'heroicons:heart' },
]

onMounted(async () => {
  if (eventStore.events.length === 0) {
    await eventStore.fetchEvents()
  }
})
</script>