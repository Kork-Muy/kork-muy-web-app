<template>
  <div class="container mx-auto px-4 py-12">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Event Management</h1>
      <div class="flex space-x-4">
        <UiButton @click="router.push('/events/manage/tickets')">
          <Icon name="ph:ticket" class="mr-2 h-4 w-4" />
          Manage Tickets
        </UiButton>
        <UiButton @click="router.push('/create')">
          <Icon name="ph:plus" class="mr-2 h-4 w-4" />
          Create Event
        </UiButton>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- QR Scanner Section -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Scan Ticket QR Code</h2>
        <div class="bg-card p-4 rounded-lg">
          <div v-if="!isCameraActive" class="text-center py-8">
            <p class="text-muted-foreground mb-4">Click the button below to start scanning</p>
            <UiButton @click="startScanner">
              <Icon name="ph:camera" class="mr-2 h-4 w-4" />
              Start Scanner
            </UiButton>
          </div>

          <div v-else class="space-y-4">
            <div v-if="cameraError" class="text-center py-8">
              <p class="text-destructive mb-4">{{ cameraError }}</p>
              <div v-if="isMobileSafari" class="mb-4 p-4 bg-muted rounded-lg">
                <p class="text-sm font-medium mb-2">Mobile Safari Instructions:</p>
                <ul class="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Make sure you're using HTTPS</li>
                  <li>Allow camera access when prompted</li>
                  <li>If camera doesn't start, try closing and reopening Safari</li>
                  <li>Make sure no other app is using the camera</li>
                </ul>
              </div>
              <UiButton variant="outline" @click="stopScanner">
                <Icon name="ph:x" class="mr-2 h-4 w-4" />
                Stop Scanner
              </UiButton>
            </div>

            <div v-else>
              <div id="reader" class="w-full max-w-md mx-auto"></div>
              <div class="flex justify-center space-x-4 mt-4">
                <UiButton variant="outline" @click="stopScanner">
                  <Icon name="ph:x" class="mr-2 h-4 w-4" />
                  Stop Scanner
                </UiButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scan Results Section -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Scan Results</h2>
        <div class="bg-card p-4 rounded-lg">
          <div v-if="scanResults.length === 0" class="text-center py-8">
            <p class="text-muted-foreground">No tickets scanned yet</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="result in scanResults" :key="result.timestamp" class="p-4 border rounded-lg">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium">{{ result.ticketId }}</p>
                  <p class="text-sm text-muted-foreground">
                    Scanned at: {{ formatDate(result.timestamp) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Html5Qrcode } from 'html5-qrcode'

const router = useRouter()
const isCameraActive = ref(false)
const scanResults = ref([])
const cameraError = ref(null)
const currentCamera = ref('environment')
let html5QrCode = null

// Check if running on mobile Safari
const isMobileSafari = computed(() => {
  const ua = window.navigator.userAgent
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
  const webkit = !!ua.match(/WebKit/i)
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i)
  return iOSSafari
})

// Start the scanner
const startScanner = async () => {
  try {
    isCameraActive.value = true
    cameraError.value = null

    // Get available cameras
    const devices = await Html5Qrcode.getCameras()
    if (devices && devices.length) {
      const cameraId = currentCamera.value === 'environment'
        ? devices.find(d => d.label.toLowerCase().includes('back'))?.id || devices[0].id
        : devices.find(d => d.label.toLowerCase().includes('front'))?.id || devices[0].id

      html5QrCode = new Html5Qrcode("reader")
      await html5QrCode.start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        onScanSuccess,
        onScanFailure
      )
    } else {
      throw new Error('No cameras found')
    }
  } catch (error) {
    console.error('Failed to start scanner:', error)
    cameraError.value = error.message || 'Failed to start camera'
  }
}

// Stop the scanner
const stopScanner = async () => {
  if (html5QrCode) {
    try {
      await html5QrCode.stop()
      html5QrCode = null
    } catch (error) {
      console.error('Failed to stop scanner:', error)
    }
  }
  isCameraActive.value = false
  cameraError.value = null
}

// Switch between front and back cameras

// Handle successful scan
const onScanSuccess = (decodedText) => {
  scanResults.value.unshift({
    ticketId: decodedText,
    timestamp: new Date()
  })
  stopScanner()
}

// Handle scan failure
const onScanFailure = (error) => {
  console.warn('Scan failed:', error)
}

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Cleanup on component unmount
onUnmounted(() => {
  if (html5QrCode) {
    html5QrCode.stop()
  }
})
</script>

<style>
#reader {
  width: 100% !important;
  max-width: 400px;
  margin: 0 auto;
}

#reader video {
  width: 100% !important;
  border-radius: 0.5rem;
}

#reader__scan_region {
  background: transparent !important;
}

#reader__scan_region video {
  border-radius: 0.5rem;
}

#reader__dashboard {
  display: none !important;
}
</style>