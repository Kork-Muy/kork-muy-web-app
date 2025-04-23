<template>
  <UiCard class="overflow-hidden h-full flex flex-col">
    <div class="relative aspect-video overflow-hidden">
      <img 
        :src="event.image || '/images/placeholder.jpg'" 
        :alt="event.title"
        class="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
      />
      <div class="absolute top-2 right-2">
        <UiBadge>{{ event.category }}</UiBadge>
      </div>
    </div>
    <UiCardContent class="flex-1 flex flex-col p-4">
      <div class="flex items-center text-sm text-muted-foreground mb-2">
        <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
        <span>{{ formatDate(event.date) }}</span>
        <span class="mx-2">•</span>
        <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
        <span>{{ event.location }}</span>
      </div>
      <h3 class="text-lg font-semibold mb-2">
        <NuxtLink :to="`/events/${event.id}`" class="hover:text-primary">
          {{ event.title }}
        </NuxtLink>
      </h3>
      <p class="text-muted-foreground text-sm mb-4 line-clamp-2">
        {{ event.description }}
      </p>
      <div class="mt-auto flex items-center justify-between">
        <div class="text-sm">
          <span v-if="event.price" class="font-medium">${{ event.price }}</span>
          <span v-else class="text-green-600 font-medium">Free</span>
        </div>
        <UiButton variant="outline" size="sm" asChild>
          <NuxtLink :to="`/events/${event.id}`">
            View Details
          </NuxtLink>
        </UiButton>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date)
}
</script>