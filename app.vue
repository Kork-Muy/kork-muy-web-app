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

useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    }
  ]
})

onMounted(async () => {
  if(userStore.getIsAuthenticated) {
    await Promise.all([
      userStore.initialize(),
      ticketStore.initialize(),
      eventStore.initialize()
    ])
  }
})
</script>