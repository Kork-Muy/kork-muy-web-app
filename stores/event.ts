import { defineStore } from 'pinia';
import type { Event } from '~/models/dto/event/IEvent';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [] as Event[],
    isLoading: false,
    error: null as string | null,
  }),
  
  getters: {
    getListEvent: (state) => {
      return state.events;
    },
    getEventById: (state) => (id: string) => {
      return state.events.find(event => event.id === id)
    },
    // getEventsByCategory: (state) => (category: string) => {
    //   return state.events.filter(event => event.category === category)
    // },
    getFeaturedEvents: (state) => {
      return state.events.slice(0, 4)
    }
  },
  
  actions: {
    async fetchEvents() {
      this.isLoading = true
      this.error = null
      
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const response = await $fetch(process.env.API_URL || 'http://localhost:3001' + '/api/events')
        console.log("response", response);
        this.events = response as Event[];
      } catch (error) {
        this.error = 'Failed to fetch events'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    
    async addEvent(event: Omit<Event, 'id'>) {
      this.isLoading = true
      this.error = null
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newEvent: Event = {
          ...event,
          id: Date.now().toString(),
        }
        
        this.events.push(newEvent)
        return newEvent
      } catch (error) {
        this.error = 'Failed to add event'
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})