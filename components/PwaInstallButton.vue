<template>
  <UiButton
    v-if="canInstall"
    variant="outline"
    class="fixed bottom-4 right-4 z-50"
    @click="install"
  >
    <Icon name="ph:download" class="mr-2 h-4 w-4" />
    Install App
  </UiButton>
</template>

<script setup>
const canInstall = ref(false)
let deferredPrompt = null

// Listen for the beforeinstallprompt event
onMounted(() => {
  // Check if the app is already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    canInstall.value = false
    return
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired')
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault()
    // Stash the event so it can be triggered later
    deferredPrompt = e
    console.log('Stored deferredPrompt:', deferredPrompt)
    // Update UI to notify the user they can add to home screen
    canInstall.value = true
  })

  // Listen for the appinstalled event
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed')
    canInstall.value = false
  })
})

// Handle the install button click
const install = async () => {
  console.log('Install button clicked')
  console.log('Current deferredPrompt:', deferredPrompt)
  
  if (!deferredPrompt) {
    console.log('No deferredPrompt available')
    return
  }

  // Show the install prompt
  deferredPrompt.prompt()
  console.log('Install prompt shown')

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice
  console.log('User choice outcome:', outcome)

  // We no longer need the prompt. Clear it up
  deferredPrompt = null
  console.log('Cleared deferredPrompt')

  // Hide the install button
  canInstall.value = false
  console.log('Install button hidden')
}
</script> 