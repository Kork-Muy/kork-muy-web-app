<template>
  <ClientOnly>
    <NuxtLayout>
      <VitePwaManifest />
      <NuxtPage />
    </NuxtLayout>
  </ClientOnly>
</template>
<script setup lang="ts">
import { useTicketStore } from '~/stores/ticket'
import { useEventStore } from '~/stores/event'

const ticketStore = useTicketStore()
const eventStore = useEventStore()
const userStore = useUserStore()

onMounted(async () => {
  if(userStore.getIsAuthenticated) {
    await Promise.all([
      userStore.fetchProfile(),
      ticketStore.initialize(),
      eventStore.fetchEvents()
    ])
  }
})
</script>