import { defineStore } from 'pinia'
import { BuyTicketRequest } from '~/models/api/buy-ticket/request'
import { BuyTicketFormDto } from '~/models/dto/ticket/BuyTicketForm.dto'
import type { IBuyTicketFormDto } from '~/models/dto/ticket/IBuyTicketForm.dto'

interface Ticket {
  id: string
  eventId: string
  userId: string
  type: 'VIP' | 'Regular' | 'Early Bird'
  price: number
  purchaseDate: string
  status: 'active' | 'used' | 'cancelled'
  qrCode?: string
}

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    tickets: [] as Ticket[],
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    getTicketsByEventId: (state) => (eventId: string) => {
      return state.tickets.filter(ticket => ticket.eventId === eventId)
    },
    getTicketsByUserId: (state) => (userId: string) => {
      return state.tickets.filter(ticket => ticket.userId === userId)
    },
    getActiveTickets: (state) => {
      return state.tickets.filter(ticket => ticket.status === 'active')
    },
  },

  actions: {
    // Fetch tickets from API (dummy data for now)
    async fetchTickets() {
      this.isLoading = true
      this.error = null
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Dummy data
        this.tickets = [
          {
            id: '1',
            eventId: '1',
            userId: '1',
            type: 'VIP',
            price: 150,
            purchaseDate: '2024-03-20',
            status: 'active',
            qrCode: 'dummy-qr-1'
          },
          {
            id: '2',
            eventId: '1',
            userId: '1',
            type: 'Regular',
            price: 75,
            purchaseDate: '2024-03-19',
            status: 'active',
            qrCode: 'dummy-qr-2'
          },
          {
            id: '3',
            eventId: '2',
            userId: '1',
            type: 'Early Bird',
            price: 50,
            purchaseDate: '2024-03-18',
            status: 'used',
            qrCode: 'dummy-qr-3'
          }
        ]

        // Store in localStorage for offline access
        localStorage.setItem('tickets', JSON.stringify(this.tickets))
      } catch (error) {
        this.error = 'Failed to fetch tickets'
        console.error('Error fetching tickets:', error)
      } finally {
        this.isLoading = false
      }
    },

    // Load tickets from localStorage when offline
    loadOfflineTickets() {
      const storedTickets = localStorage.getItem('tickets')
      if (storedTickets) {
        this.tickets = JSON.parse(storedTickets)
      }
    },

    // Add a new ticket
    async addTicket(ticket: Omit<Ticket, 'id' | 'purchaseDate' | 'qrCode'>) {
      this.isLoading = true
      this.error = null
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const newTicket: Ticket = {
          ...ticket,
          id: Math.random().toString(36).substr(2, 9),
          purchaseDate: new Date().toISOString().split('T')[0],
          qrCode: `dummy-qr-${Math.random().toString(36).substr(2, 9)}`
        }
        
        this.tickets.push(newTicket)
        
        // Update localStorage
        localStorage.setItem('tickets', JSON.stringify(this.tickets))
        
        return newTicket
      } catch (error) {
        this.error = 'Failed to add ticket'
        console.error('Error adding ticket:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Update ticket status
    async updateTicketStatus(ticketId: string, status: Ticket['status']) {
      this.isLoading = true
      this.error = null
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const ticketIndex = this.tickets.findIndex(t => t.id === ticketId)
        if (ticketIndex !== -1) {
          this.tickets[ticketIndex].status = status
          
          // Update localStorage
          localStorage.setItem('tickets', JSON.stringify(this.tickets))
        }
      } catch (error) {
        this.error = 'Failed to update ticket status'
        console.error('Error updating ticket status:', error)
        throw error
      } finally {
        this.isLoading = false
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
        console.log(response);
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