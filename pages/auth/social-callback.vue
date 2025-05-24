<template>
    <div class="min-h-screen flex items-center justify-center">
       <loading-spinner />
       <div v-if="error" class="text-destructive mt-4">{{ error }}</div>
    </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const error = ref<string | null>(null)

const accessToken = String(route.query.access_token)
const refreshToken = String(route.query.refresh_token)

onMounted(async () => {
    if (!accessToken || !refreshToken) {
        error.value = 'Invalid authentication tokens'
        setTimeout(() => router.push('/login'), 2000)
        return
    }

    try {
        await userStore.setUser(accessToken, refreshToken)
    } catch (err) {
        console.error('Social callback error:', err)
        error.value = 'Failed to authenticate. Please try again.'
        setTimeout(() => router.push('/login'), 2000)
    }
})
</script>