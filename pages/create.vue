<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-8">Create a New Event</h1>
    
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Event Details</UiCardTitle>
        <UiCardDescription>
          Fill in the details below to create your event
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <UiLabel for="title">Event Title</UiLabel>
              <UiInput 
                id="title" 
                v-model="form.title" 
                placeholder="Enter event title" 
                required
              />
            </div>
            <div class="space-y-2">
              <UiLabel for="category">Category</UiLabel>
              <UiSelect id="category" v-model="form.category" required>
                <UiSelectTrigger>
                  {{ form.category || 'Select a category' }}
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
            
            <div class="space-y-2">
              <UiLabel for="date">Date</UiLabel>
              <UiInput 
                id="date" 
                v-model="form.date" 
                type="date" 
                required
              />
            </div>
            
            <div class="space-y-2">
              <UiLabel for="location">Location</UiLabel>
              <UiInput 
                id="location" 
                v-model="form.location" 
                placeholder="Enter event location" 
                required
              />
            </div>
            
            <div class="space-y-2">
              <UiLabel for="organizer">Organizer</UiLabel>
              <UiInput 
                id="organizer" 
                v-model="form.organizer" 
                placeholder="Enter organizer name" 
                required
              />
            </div>
            
            <div class="space-y-2">
              <UiLabel for="price">Price ($)</UiLabel>
              <UiInput 
                id="price" 
                v-model.number="form.price" 
                type="number" 
                min="0" 
                step="0.01" 
                placeholder="0.00 for free events"
              />
            </div>
          </div>
          
          <div class="space-y-2">
            <UiLabel for="description">Description</UiLabel>
            <UiTextarea 
              id="description" 
              v-model="form.description" 
              placeholder="Describe your event" 
              rows="5" 
              required
            />
          </div>
          
          <div class="space-y-2">
            <UiLabel for="image">Image URL</UiLabel>
            <UiInput 
              id="image" 
              v-model="form.image" 
              placeholder="Enter image URL" 
            />
            <p class="text-sm text-muted-foreground">
              Provide a URL to an image for your event. Leave blank to use a placeholder.
            </p>
          </div>
          
          <div class="flex justify-end space-x-4">
            <UiButton type="button" variant="outline" @click="resetForm">
              Reset
            </UiButton>
            <UiButton type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Creating...' : 'Create Event' }}
            </UiButton>
          </div>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script setup>
import { useEventStore } from '~/stores/event'
import { useUserStore } from '~/stores/user'

const eventStore = useEventStore()
const userStore = useUserStore()
const router = useRouter()

const isSubmitting = ref(false)

const categories = [
  'Technology',
  'Music',
  'Business',
  'Art',
  'Food',
  'Health',
  'Sports',
  'Education'
]

const form = ref({
  title: '',
  description: '',
  date: '',
  location: '',
  image: '',
  organizer: '',
  category: '',
  price: null,
  attendees: 0
})

// If user is logged in, pre-fill organizer field
onMounted(() => {
  if (userStore.isAuthenticated && userStore.user) {
    form.value.organizer = userStore.user.name
  }
})

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Set default attendees count
    form.value.attendees = Math.floor(Math.random() * 50) + 10
    
    // Create the event
    const newEvent = await eventStore.addEvent(form.value)
    
    // Show success message
    // In a real app, you would use a toast notification
    alert('Event created successfully!')
    
    // Redirect to the event page
    router.push(`/events/${newEvent.id}`)
  } catch (error) {
    console.error('Error creating event:', error)
    alert('Failed to create event. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
    organizer: userStore.isAuthenticated ? userStore.user?.name : '',
    category: '',
    price: null,
    attendees: 0
  }
}
</script>