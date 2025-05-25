<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-primary">
          KorkMuy
        </NuxtLink>
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/" class="text-foreground hover:text-primary transition-colors">
            Home
          </NuxtLink>
          <NuxtLink to="/tickets" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">
            Tickets
          </NuxtLink>
          <NuxtLink to="/events" class="text-foreground hover:text-primary transition-colors">
            Events
          </NuxtLink>
          <NuxtLink to="/events/manage" class="text-foreground hover:text-primary transition-colors">
            Manage
          </NuxtLink>
          <NuxtLink to="/create" class="text-foreground hover:text-primary transition-colors">
            Create Event
          </NuxtLink>
          <NuxtLink v-if="!isAuthenticated" to="/login" class="text-foreground hover:text-primary transition-colors">
            Login
          </NuxtLink>
          <div v-else class="relative" @click="toggleUserMenu" @keydown.escape="isUserMenuOpen = false">
            <button class="flex items-center space-x-1 focus:outline-none">
              <span>{{ user?.fullName || 'Guest' }}</span>
              <Icon name="heroicons:chevron-down" class="w-4 h-4" />
            </button>
            <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 z-10">
              <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                Profile
              </NuxtLink>
              <NuxtLink to="/my-events" class="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                My Events
              </NuxtLink>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted">
                Logout
              </button>
            </div>
          </div>
        </nav>
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden focus:outline-none">
          <Icon v-if="!isMobileMenuOpen" name="heroicons:bars-3" class="w-6 h-6" />
          <Icon v-else name="heroicons:x-mark" class="w-6 h-6" />
        </button>
      </div>
      <div v-if="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NuxtLink to="/" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">
            Home
          </NuxtLink>
          <NuxtLink to="/tickets" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">
            Tickets
          </NuxtLink>
          <NuxtLink to="/events" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">
            Events
          </NuxtLink>
          <NuxtLink to="/events/manage" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">
            Manage
          </NuxtLink>
          <NuxtLink to="/create" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">
            Create Event
          </NuxtLink>
          <NuxtLink v-if="!isAuthenticated" to="/login" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">
            Login
          </NuxtLink>
          <template v-else>
            <NuxtLink to="/profile" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">
              Profile
            </NuxtLink>
            <NuxtLink to="/my-events" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">
              My Events
            </NuxtLink>
            <button @click="logout" class="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-muted">
              Logout
            </button>
          </template>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="bg-muted py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">KorkMuy</h3>
            <p class="text-muted-foreground">
              Discover and create amazing events with KorkMuy, your go-to platform for event management.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-muted-foreground hover:text-primary">Home</NuxtLink></li>
              <li><NuxtLink to="/events" class="text-muted-foreground hover:text-primary">Events</NuxtLink></li>
              <li><NuxtLink to="/create" class="text-muted-foreground hover:text-primary">Create Event</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Categories</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/events?category=Technology" class="text-muted-foreground hover:text-primary">Technology</NuxtLink></li>
              <li><NuxtLink to="/events?category=Music" class="text-muted-foreground hover:text-primary">Music</NuxtLink></li>
              <li><NuxtLink to="/events?category=Business" class="text-muted-foreground hover:text-primary">Business</NuxtLink></li>
              <li><NuxtLink to="/events?category=Art" class="text-muted-foreground hover:text-primary">Art</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <ul class="space-y-2">
              <li class="flex items-center space-x-2">
                <Icon name="heroicons:envelope" class="w-5 h-5" />
                <span class="text-muted-foreground">neuporng123@gmail.com</span>
              </li>
              <li class="flex items-center space-x-2">
                <Icon name="heroicons:phone" class="w-5 h-5" />
                <span class="text-muted-foreground">+855 (88) 255-0515</span>
              </li>
            </ul>
          </div>
        </div>
        <PwaInstallButton />
        <div class="mt-8 pt-8 border-t border-border">
          <p class="text-center text-muted-foreground">
            &copy; {{ new Date().getFullYear() }} KorkMuy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import PwaInstallButton from '~/components/PwaInstallButton.vue'

const userStore = useUserStore()
const isAuthenticated = computed(() => userStore.getIsAuthenticated)
const user = computed(() => userStore.user)

const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const logout = async () => {
  await userStore.logout()
  isUserMenuOpen.value = false
  navigateTo('/')
}

// Close user menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target
    if (!target.closest('.user-menu') && isUserMenuOpen.value) {
      isUserMenuOpen.value = false
    }
  })
})
</script>