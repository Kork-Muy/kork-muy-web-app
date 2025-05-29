import { defineStore } from 'pinia';
import type { IEventDto } from '~/models/dto/event/IEvent.dto';
import { EventDto } from '~/models/dto/event/Event.dto';
import type { IEventResponse } from '~/models/api/events/response';
import { QrCode } from 'lucide-vue-next';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [] as IEventDto[],
    isLoading: false,
    error: null as string | null,
    offlineMode: false,
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
      if(this.offlineMode) {
        return;
      }

      this.isLoading = true
      this.error = null
      
      try {
        const { $axios } = useNuxtApp();  
        const response = (await $axios.get('/api/events')).data as IEventResponse;
        this.events = response.events.map((event: IEventDto) => new EventDto(event));
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

    setOfflineMode(offlineMode: boolean) {
      this.offlineMode = offlineMode;
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
    },
    async checkTicket(qrcode: string, event: EventDto) {
      const { $axios } = useNuxtApp();
      const response = (await $axios.post('/api/events/check-in-ticket', { qrcode, eventId: event.id })).data;
      return response;
    },

    loadOfflineEvents() {
      if(window) {
        this.events = JSON.parse(localStorage.getItem("events") || "[]");
      }
    },

    async initialize() {
      if(this.offlineMode) {
        this.loadOfflineEvents();
      } else {
        this.fetchEvents();
      }
    }
  }
})