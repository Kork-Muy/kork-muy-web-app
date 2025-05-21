<template>
    <div class="container mx-auto px-4 py-12">
        <div v-if="isLoading" class="space-y-4">
            <UiSkeleton class="h-8 w-1/3" />
            <UiSkeleton class="h-64 w-full" />
            <UiSkeleton class="h-32 w-full" />
        </div>

        <div v-else-if="listEvent.length === 0" class="text-center py-12">
            <h2 class="text-2xl font-bold mb-4">Event not found</h2>
            <p class="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
        </div>

        <template v-else>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div v-for="event in listEvent" :key="event.id">
                    <EventCard :event="event" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { useEventStore } from '~/stores/event'
const eventStore = useEventStore()

onMounted(async () => {
    await eventStore.fetchEvents()
})

const { isLoading } = storeToRefs(eventStore)

const listEvent = computed(() => {
    return eventStore.getListEvent
})
</script>