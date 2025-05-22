<template>
  <UiCard class="overflow-hidden h-full flex flex-col">
    <div class="relative aspect-video overflow-hidden">
      <img 
        :src="eventObject.bannerImageUrl || '/images/placeholder.jpg'" 
        :alt="eventObject.title"
        class="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
      />
      <div class="absolute top-2 right-2">
        <UiBadge>{{ eventObject.minLevel }}</UiBadge>
      </div>
    </div>
    <UiCardContent class="flex-1 flex flex-col p-4">
      <div class="flex items-center text-sm text-muted-foreground mb-2">
        <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
        <span>{{ eventObject.formattedDate }}</span>
        <span class="mx-2">•</span>
        <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
        <span>{{ eventObject.location }}</span>
      </div>
      <h3 class="text-lg font-semibold mb-2">
        <NuxtLink :to="`/events/${eventObject.id}`" class="hover:text-primary">
          {{ eventObject.title }}
        </NuxtLink>
      </h3>
      <!-- <p class="text-muted-foreground text-sm mb-4 line-clamp-2">
        {{ eventObject.description }}
      </p> -->
      <div class="mt-auto flex items-center justify-between">
        <div class="text-sm">
          <span v-if="eventObject.ticketTypes.length > 0" class="font-medium">Tickets Available</span>
          <span v-else class="text-green-600 font-medium">Free</span>
        </div>
        <UiButton variant="outline" size="sm" asChild>
          <NuxtLink :to="`/events/${eventObject.id}`">
            View Details
          </NuxtLink>
        </UiButton>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { IEvent } from '~/models/dto/event/IEvent';
import { Event } from '~/models/dto/event/Event';

const props = defineProps({
  event: {
    type: Object as PropType<IEvent>,
    required: true
  }
})

const eventObject = computed(() => {
  return new Event(props.event)
})

</script>