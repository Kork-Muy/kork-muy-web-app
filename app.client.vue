<template>
  <NuxtLayout>
    <VitePwaManifest />
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useTicketStore } from '~/stores/ticket'
import { useEventStore } from '~/stores/event'

const ticketStore = useTicketStore()
const eventStore = useEventStore()
const userStore = useUserStore()

onMounted(async () => {
  await Promise.all([
    ticketStore.initialize(),
    eventStore.fetchEvents(),
    userStore.checkIsAuthenticated()
  ])
})
</script>