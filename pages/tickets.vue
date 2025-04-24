<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-8">My Tickets</h1>
    
    <div v-if="ticketStore.isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
    
    <div v-else-if="ticketStore.error" class="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
      {{ ticketStore.error }}
    </div>
    
    <div v-else-if="userTickets.length === 0" class="text-center py-12">
      <p class="text-muted-foreground text-lg">You haven't booked any tickets yet.</p>
      <UiButton class="mt-4" @click="router.push('/events')">
        Browse Events
      </UiButton>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UiCard v-for="ticket in userTickets" :key="ticket.id" class="overflow-hidden">
        <UiCardHeader>
          <div class="flex justify-between items-start">
            <div>
              <UiCardTitle>{{ getEventTitle(ticket.eventId) }}</UiCardTitle>
              <UiCardDescription>
                {{ formatDate(ticket.purchaseDate) }}
              </UiCardDescription>
            </div>
            <UiBadge :variant="getStatusVariant(ticket.status)">
              {{ ticket.status }}
            </UiBadge>
          </div>
        </UiCardHeader>
        
        <UiCardContent>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Ticket Type</span>
              <span class="font-medium">{{ ticket.type }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Price</span>
              <span class="font-medium">${{ ticket.price }}</span>
            </div>
            
            <div v-if="ticket.qrCode" class="mt-4">
              <div class="bg-muted p-4 rounded-lg text-center">
                <p class="text-sm text-muted-foreground mb-2">QR Code</p>
                <div class="bg-white p-2 rounded inline-block">
                  {{ ticket.qrCode }}
                </div>
              </div>
            </div>
          </div>
        </UiCardContent>
        
        <UiCardFooter class="flex justify-between">
          <UiButton 
            v-if="ticket.status === 'active'"
            variant="outline" 
            @click="updateTicketStatus(ticket.id, 'used')"
          >
            Mark as Used
          </UiButton>
          
          <UiButton 
            v-if="ticket.status === 'active'"
            variant="destructive" 
            @click="updateTicketStatus(ticket.id, 'cancelled')"
          >
            Cancel Ticket
          </UiButton>
        </UiCardFooter>
      </UiCard>
    </div>
  </div>
</template>

<script setup>
import { useTicketStore } from '~/stores/ticket'
import { useEventStore } from '~/stores/event'
import { useUserStore } from '~/stores/user'

const ticketStore = useTicketStore()
const eventStore = useEventStore()
const userStore = useUserStore()
const router = useRouter()

// Get tickets for current user
const userTickets = computed(() => {
  if (!userStore.user) return []
  return ticketStore.getTicketsByUserId(userStore.user.id)
})

// Get event title from eventId
const getEventTitle = (eventId) => {
  const event = eventStore.events.find(e => e.id === eventId)
  return event ? event.title : 'Unknown Event'
}

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Get status variant for badge
const getStatusVariant = (status) => {
  switch (status) {
    case 'active':
      return 'default'
    case 'used':
      return 'secondary'
    case 'cancelled':
      return 'destructive'
    default:
      return 'default'
  }
}

// Update ticket status
const updateTicketStatus = async (ticketId, status) => {
  try {
    await ticketStore.updateTicketStatus(ticketId, status)
  } catch (error) {
    console.error('Failed to update ticket status:', error)
  }
}

// Initialize stores
onMounted(async () => {
  await Promise.all([
    ticketStore.initialize(),
    eventStore.fetchEvents()
  ])
})
</script> 