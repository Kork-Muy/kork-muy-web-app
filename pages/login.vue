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
            <div v-if="isRegister" class="flex gap-4">
              <div class="flex-1 space-y-2">
                <UiLabel for="firstname">First Name</UiLabel>
                <UiInput id="firstname" v-model="form.firstname" placeholder="Enter your first name" required />
              </div>

              <div class="flex-1 space-y-2">
                <UiLabel for="lastname">Last Name</UiLabel>
                <UiInput id="lastname" v-model="form.lastname" placeholder="Enter your last name" required />
              </div>
            </div>

            <div class="space-y-2">
              <UiLabel for="email">Email</UiLabel>
              <UiInput id="email" v-model="form.email" type="email" placeholder="Enter your email" required />
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <UiLabel for="password">Password</UiLabel>
                <NuxtLink v-if="!isRegister" to="/forgot-password" class="text-sm text-primary hover:underline">
                  Forgot password?
                </NuxtLink>
              </div>
              <UiInput id="password" v-model="form.password" type="password" placeholder="Enter your password"
                required />
            </div>

            <div v-if="isRegister" class="space-y-2">
              <UiLabel for="confirmPassword">Confirm Password</UiLabel>
              <UiInput id="confirmPassword" v-model="form.confirmPassword" type="password"
                placeholder="Confirm your password" required />
            </div>

            <div v-if="error" class="text-destructive text-sm">
              {{ error }}
            </div>

            <UiButton type="submit" class="w-full" :disabled="isLoading">
              {{ isLoading ? 'Processing...' : (isRegister ? 'Create Account' : 'Login') }}
            </UiButton>
          </form>
          <UiButton type="button" class="w-full" @click="handleGoogleLogin">
            <UiIcon name="google" />
            Login with Google
          </UiButton>

          <div class="mt-6 text-center">
            <p class="text-sm text-muted-foreground">
              {{ isRegister ? 'Already have an account?' : "Don't have an account?" }}
              <button @click="isRegister = !isRegister" class="text-primary hover:underline font-medium">
                {{ isRegister ? 'Login' : 'Create an account' }}
              </button>
            </p>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { LoginRequest } from '~/models/api/login/request';
import { RegisterRequest } from '~/models/api/register/request';

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const isRegister = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const handleGoogleLogin = async () => {
  await userStore.googleLogin();
}

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
      const request = new RegisterRequest(form.value);
      await userStore.register(request);
    } else {
      // Login
      const request = new LoginRequest(form.value);
      await userStore.login(request);
    }

    // Redirect after successful login/register
    const redirectPath = route.query.redirect || '/'
    router.push(redirectPath.toString())
  } catch (err) {
    console.error("handleSubmit", err);
    error.value = userStore.error || 'An error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>