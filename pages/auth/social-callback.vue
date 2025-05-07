<template>
    <div class="min-h-screen flex items-center justify-center">
       <loading-spinner />
    </div>
</template>

<script setup>
console.log('social callback')
const userStore = useUserStore()
const route = useRoute()
const token = route.query.token
console.log('token', token)
onMounted(async () => {
    await userStore.setUser(token)
})
</script>