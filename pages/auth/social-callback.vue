<template>
    <div class="min-h-screen flex items-center justify-center">
       <loading-spinner />
       <div v-if="error" class="text-destructive mt-4">{{ error }}</div>
    </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()
const error = ref<string | null>(null)

onMounted(async () => {

    try {
        await userStore.fetchProfile();
        router.push('/')
    } catch (err) {
        console.error('Social callback error:', err)
        error.value = 'Failed to authenticate. Please try again.'
        setTimeout(() => router.push('/login'), 2000)
    }
})
</script>