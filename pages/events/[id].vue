<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="isLoading" class="space-y-4">
      <UiSkeleton class="h-8 w-1/3" />
      <UiSkeleton class="h-64 w-full" />
      <UiSkeleton class="h-32 w-full" />
    </div>
    
    <div v-else-if="!event" class="text-center py-12">
      <h2 class="text-2xl font-bold mb-4">Event not found</h2>
      <p class="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
      <UiButton asChild>
        <NuxtLink to="/events">
          Browse Events
        </NuxtLink>
      </UiButton>
    </div>
    
    <template v-else>
      <div class="mb-6">
        <NuxtLink to="/events" class="text-primary hover:underline flex items-center">
          <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-1" />
          Back to Events
        </NuxtLink>
        <NuxtLink :to="`/events/manage/${event.id}`" class="text-primary hover:underline flex items-center">
          <Icon name="heroicons:pencil" class="w-4 h-4 mr-1" />
          Manage
        </NuxtLink>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Event Details -->
        <div class="lg:col-span-2">
          <img 
            :src="event.coverImageUrl || '/images/placeholder.jpg'" 
            :alt="event.title"
            class="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
          />
          
          <div class="flex flex-wrap gap-2 mb-6">
            <!-- <UiBadge>{{ event.category }}</UiBadge> -->
            <UiBadge variant="outline">
              <Icon name="heroicons:users" class="w-4 h-4 mr-1" />
              {{ 0 }} attendees
            </UiBadge>
            <!-- <UiBadge variant="outline" v-if="event.price">
              ${{ event.price }}
            </UiBadge>
            <UiBadge variant="outline" v-else class="text-green-600">
              Free
            </UiBadge> -->
          </div>
          
          <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ event.title }}</h1>
          
          <div class="flex items-center text-muted-foreground mb-6">
            <div class="flex items-center mr-4">
              <Icon name="heroicons:calendar" class="w-5 h-5 mr-1" />
              <span>{{ event.formattedDate }}</span>
            </div>
            <div class="flex items-center">
              <Icon name="heroicons:map-pin" class="w-5 h-5 mr-1" />
              <span>{{ event.location }}</span>
            </div>
          </div>
          
          <UiTabs defaultValue="details" class="mb-8">
            <UiTabsList>
              <UiTabsTrigger value="details">Details</UiTabsTrigger>
              <UiTabsTrigger value="organizer">Organizer</UiTabsTrigger>
              <UiTabsTrigger value="location">Location</UiTabsTrigger>
            </UiTabsList>
            <UiTabsContent value="details">
              <UiCard>
                <UiCardHeader>
                  <UiCardTitle>Details</UiCardTitle>
                </UiCardHeader>
                <UiCardContent>
                  <p class="text-foreground leading-relaxed">
                    {{ event.description }}
                  </p>
                </UiCardContent>
              </UiCard>
            </UiTabsContent>
            <UiTabsContent value="organizer">
              <UiCard>
                <UiCardHeader>
                  <UiCardTitle>Organizer Information</UiCardTitle>
                </UiCardHeader>
                <UiCardContent>
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4">
                      <Icon name="heroicons:user" class="w-6 h-6" />
                    </div>
                    <div>
                      <h3 class="font-medium">{{ event.organizer }}</h3>
                      <p class="text-sm text-muted-foreground">Event Organizer</p>
                    </div>
                  </div>
                  <p class="text-muted-foreground">
                    Contact the organizer for more information about this event.
                  </p>
                </UiCardContent>
              </UiCard>
            </UiTabsContent>
            <UiTabsContent value="location">
              <UiCard>
                <UiCardHeader>
                  <UiCardTitle>Event Location</UiCardTitle>
                </UiCardHeader>
                <UiCardContent>
                  <div class="flex items-center mb-4">
                    <Icon name="heroicons:map-pin" class="w-5 h-5 mr-2 text-primary" />
                    <span>{{ event.location }}</span>
                  </div>
                  <div class="bg-muted h-48 rounded-lg flex items-center justify-center">
                    <p class="text-muted-foreground">Map view would be displayed here</p>
                  </div>
                </UiCardContent>
              </UiCard>
            </UiTabsContent>
          </UiTabs>
        </div>
        
        <!-- Sidebar -->
        <div>
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Register for this Event</UiCardTitle>
              <UiCardDescription>
                Secure your spot at this event
              </UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <div class="mb-4">
                <!-- <p class="text-2xl font-bold">
                  <span v-if="event.price">${{ event.price }}</span>
                  <span v-else class="text-green-600">Free</span>
                </p> -->
              </div>
              
              <div class="space-y-4">
                <form @submit.prevent="handleSubmit">
                  <div>
                    <UiLabel>Email</UiLabel>
                    <UiInput type="email" v-model="form.email" />
                  </div>
                  <UiButton class="w-full" size="lg" type="submit">
                    Register Now
                  </UiButton>
                </form>
                <!-- <div>
                  <UiLabel for="tickets">Number of Tickets</UiLabel>
                  <UiInput 
                    type="number"
                    id="tickets" 
                    v-model="ticketCount" 
                    class="mt-1" 
                    min="1"
                    />
                </div> -->
                
                <div class="text-sm text-muted-foreground">
                  <p class="flex items-center mb-1">
                    <Icon name="heroicons:clock" class="w-4 h-4 mr-1" />
                    <span>{{ event.formattedDate }}</span>
                  </p>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
          
          <UiCard class="mt-6">
            <UiCardHeader>
              <UiCardTitle>Share this Event</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <div class="flex space-x-4">
                <UiButton variant="outline" size="icon">
                  <Icon name="heroicons:envelope" class="w-4 h-4" />
                </UiButton>
                <UiButton variant="outline" size="icon">
                  <Icon name="heroicons:link" class="w-4 h-4" />
                </UiButton>
                <UiButton variant="outline" size="icon">
                  <Icon name="heroicons:chat-bubble-left-right" class="w-4 h-4" />
                </UiButton>
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { EventDto } from '~/models/dto/event/Event.dto'
import { useEventStore } from '~/stores/event'
import { useTicketStore } from '~/stores/ticket'
import { useUserStore } from '~/stores/user'
import type { IBuyTicketFormDto } from '~/models/dto/ticket/IBuyTicketForm.dto'

const route = useRoute()
const eventStore = useEventStore()
const ticketStore = useTicketStore()
const userStore = useUserStore()
const { isLoading } = storeToRefs(eventStore)

const form = reactive<IBuyTicketFormDto>({
  email: userStore.user?.email || ''
})
const event = computed(() => {
  const eventDto = eventStore.getEventById(route.params.id as string);
  if(eventDto) {
    return new EventDto(eventDto);
  }
  return null;
})
const handleSubmit = () => {
  if(event.value?.id) {
    ticketStore.buyTicket(event.value?.id as string, form);
  }
}



const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date)
}

onMounted(async () => {
  if (eventStore.events.length === 0) {
    await eventStore.fetchEvents()
  }
})
</script>