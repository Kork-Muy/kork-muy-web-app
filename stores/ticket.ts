import { defineStore } from 'pinia'
import { BuyTicketRequest } from '~/models/api/buy-ticket/request'
import { BuyTicketFormDto } from '~/models/dto/ticket/BuyTicketForm.dto'
import type { IBuyTicketFormDto } from '~/models/dto/ticket/IBuyTicketForm.dto'
import type { ITicketResponse, ITicketsResponse } from '~/models/api/tickets/response'


export const useTicketStore = defineStore('ticket', {
  state: () => ({
    tickets: [] as ITicketResponse[],
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    getTickets: (state): ITicketResponse[] => {
      if(state.tickets.length === 0 && window.localStorage) {
        const storedTickets = localStorage.getItem('tickets')
        if (storedTickets) {
          return JSON.parse(storedTickets) as ITicketResponse[];
        }
      }
      return state.tickets;
    },
  },

  actions: {
    // Fetch tickets from API (dummy data for now)
    async fetchTickets() {
      this.isLoading = true
      this.error = null
      
      const { $axios } = useNuxtApp();

      try {
        // Simulate API call
        
        const respone = (await $axios.get('/api/tickets')).data as ITicketsResponse;

        this.tickets = respone.tickets;

        // Store in localStorage for offline access
        localStorage.setItem('tickets', JSON.stringify(this.tickets ?? []))
      } catch (error) {
        this.error = 'Failed to fetch tickets'
      } finally {
        this.isLoading = false
      }
    },

    // Load tickets from localStorage when offline
    loadOfflineTickets() {
      const storedTickets = localStorage.getItem('tickets')
      if (storedTickets) {
        this.tickets = JSON.parse(storedTickets ?? [])
      }
    },

    async buyTicket(eventId: string, dto: IBuyTicketFormDto) {
      this.isLoading = true
      this.error = null
      const userStore = useUserStore()
      const { $axios } = useNuxtApp();
      try {
        const request = new BuyTicketRequest({
          eventId,
          ticketData: new BuyTicketFormDto(dto).toBuyTicketData()
        })
  
        const response = await $axios.post('/api/tickets/buy-ticket', request)
        useRouter().push('/tickets')
      } catch (error) {
        this.error = 'Failed to buy ticket'
        console.error('Error buying ticket:', error)
        useRouter().push('/events')
      } finally {
        this.isLoading = false
      }
    },

    // Initialize store
    async initialize() {
      // Try to fetch from API first
      try {
        await this.fetchTickets()
      } catch (error) {
        // If API call fails, load from localStorage
        this.loadOfflineTickets()
      }
    }
  }
}) 