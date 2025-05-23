import { defineStore } from 'pinia';
import type { IEventDto } from '~/models/dto/event/IEvent.dto';
import { EventDto } from '~/models/dto/event/Event.dto';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [] as IEventDto[],
    isLoading: false,
    error: null as string | null,
  }),
  
  getters: {
    getListEvent: (state) => {
      if(state.events.length > 0) {
        return state.events;
      }
      if(window) {
        return JSON.parse(localStorage.getItem("events") || "[]");
      }
      return [];
    },
    getEventById: (state) => (id: string) => {
      if(state.events.length > 0) {
        return state.events.find((event: IEventDto) => event.id === id);
      }
      if(window) {
        return JSON.parse(localStorage.getItem("events") || "[]").find((event: IEventDto) => event.id === id);
      }
      return null;
    },
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
        this.events = response as EventDto[];
        if(window) {
          localStorage.setItem("events", JSON.stringify(this.events));
        }
      } catch (error) {
        this.error = 'Failed to fetch events'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    
    async addEvent(event: Omit<EventDto, 'id'>) {
      this.isLoading = true
      this.error = null
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newEvent: EventDto = {
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