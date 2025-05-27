<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-8">My Tickets</h1>
    
    <div v-if="ticketStore.isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
    
    <div v-else-if="ticketStore.error" class="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
      {{ ticketStore.error }}
    </div>
    
    <div v-else-if="tickets.length === 0" class="text-center py-12">
      <p class="text-muted-foreground text-lg">You haven't booked any tickets yet.</p>
      <UiButton class="mt-4" @click="router.push('/events')">
        Browse Events
      </UiButton>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TicketCard v-for="ticket in tickets" :ticket="ticket" :key="ticket.id" class="overflow-hidden" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTicketStore } from '~/stores/ticket'
import { useEventStore } from '~/stores/event'
import { useUserStore } from '~/stores/user'
import { TicketDto } from '~/models/dto/ticket/Ticket.dto'

const ticketStore = useTicketStore()
const eventStore = useEventStore()
const userStore = useUserStore()
const router = useRouter()

const tickets = computed(() => ticketStore.getTickets.map(ticket => new TicketDto(ticket)))

onMounted(async () => {
  await ticketStore.initialize()
})

</script> 