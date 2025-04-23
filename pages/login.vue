<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-md mx-auto">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>{{ isRegister ? 'Create an Account' : 'Login to Your Account' }}</UiCardTitle>
          <UiCardDescription>
            {{ isRegister ? 'Fill in your details to create a new account' : 'Enter your credentials to access your account' }}
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div v-if="isRegister" class="space-y-2">
              <UiLabel for="name">Full Name</UiLabel>
              <UiInput 
                id="name" 
                v-model="form.name" 
                placeholder="Enter your full name" 
                required
              />
            </div>
            
            <div class="space-y-2">
              <UiLabel for="email">Email</UiLabel>
              <UiInput 
                id="email" 
                v-model="form.email" 
                type="email" 
                placeholder="Enter your email" 
                required
              />
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <UiLabel for="password">Password</UiLabel>
                <NuxtLink to="/forgot-password" class="text-sm text-primary hover:underline">
                  Forgot password?
                </NuxtLink>
              </div>
              <UiInput 
                id="password" 
                v-model="form.password" 
                type="password" 
                placeholder="Enter your password" 
                required
              />
            </div>
            
            <div v-if="isRegister" class="space-y-2">
              <UiLabel for="confirmPassword">Confirm Password</UiLabel>
              <UiInput 
                id="confirmPassword" 
                v-model="form.confirmPassword" 
                type="password" 
                placeholder="Confirm your password" 
                required
              />
            </div>
            
            <div v-if="error" class="text-destructive text-sm">
              {{ error }}
            </div>
            
            <UiButton type="submit" class="w-full" :disabled="isLoading">
              {{ isLoading ? 'Processing...' : (isRegister ? 'Create Account' : 'Login') }}
            </UiButton>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-sm text-muted-foreground">
              {{ isRegister ? 'Already have an account?' : "Don't have an account?" }}
              <button 
                @click="isRegister = !isRegister" 
                class="text-primary hover:underline font-medium"
              >
                {{ isRegister ? 'Login' : 'Create an account' }}
              </button>
            </p>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const isRegister = ref(false)
const isLoading = ref(false)
const error = ref(null)

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleSubmit = async () => {
  error.value = null
  isLoading.value = true
  
  try {
    if (isRegister.value) {
      // Validate passwords match
      if (form.value.password !== form.value.confirmPassword) {
        error.value = 'Passwords do not match'
        return
      }
      
      // Register
      await userStore.register(
        form.value.name,
        form.value.email,
        form.value.password
      )
    } else {
      // Login
      await userStore.login(
        form.value.email,
        form.value.password
      )
    }
    
    // Redirect after successful login/register
    const redirectPath = route.query.redirect || '/'
    router.push(redirectPath)
  } catch (err) {
    error.value = userStore.error || 'An error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>