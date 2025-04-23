<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-8">My Profile</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Profile Sidebar -->
      <div>
        <UiCard>
          <UiCardContent class="pt-6">
            <div class="flex flex-col items-center">
              <div class="w-32 h-32 rounded-full bg-muted overflow-hidden mb-4">
                <img :src="user?.avatar || '/images/avatar.jpg'" alt="Profile picture"
                  class="w-full h-full object-cover" />
              </div>
              <h2 class="text-xl font-bold">{{ user?.name }}</h2>
              <p class="text-muted-foreground">{{ user?.email }}</p>

              <UiSeparator class="my-6" />

              <div class="w-full space-y-2">
                <UiButton variant="outline" class="w-full justify-start" asChild>
                  <NuxtLink to="/profile">
                    <Icon name="heroicons:user" class="mr-2 h-4 w-4" />
                    Profile
                  </NuxtLink>
                </UiButton>
                <UiButton variant="outline" class="w-full justify-start" asChild>
                  <NuxtLink to="/my-events">
                    <Icon name="heroicons:calendar" class="mr-2 h-4 w-4" />
                    My Events
                  </NuxtLink>
                </UiButton>
                <UiButton variant="outline" class="w-full justify-start" asChild>
                  <NuxtLink to="/settings">
                    <Icon name="heroicons:cog-6-tooth" class="mr-2 h-4 w-4" />
                    Settings
                  </NuxtLink>
                </UiButton>
                <UiButton variant="outline" class="w-full justify-start text-destructive hover:text-destructive"
                  @click="logout">
                  <Icon name="heroicons:arrow-right-on-rectangle" class="mr-2 h-4 w-4" />
                  Logout
                </UiButton>
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <!-- Profile Content -->
      <div class="md:col-span-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Profile Information</UiCardTitle>
            <UiCardDescription>
              Update your profile information
            </UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="space-y-2">
                <UiLabel for="fullName">Full Name</UiLabel>
                <UiInput id="fullName" v-model="form.name" placeholder="Enter your full name" />
              </div>

              <div class="space-y-2">
                <UiLabel for="email">Email</UiLabel>
                <UiInput id="email" v-model="form.email" type="email" placeholder="Enter your email" disabled />
                <p class="text-sm text-muted-foreground">
                  Your email address cannot be changed
                </p>
              </div>

              <div class="space-y-2">
                <UiLabel for="bio">Bio</UiLabel>
                <UiTextarea id="bio" v-model="form.bio" placeholder="Tell us about yourself" rows="4" />
              </div>

              <div class="space-y-2">
                <UiLabel for="location">Location</UiLabel>
                <UiInput id="location" v-model="form.location" placeholder="Enter your location" />
              </div>

              <div class="flex justify-end">
                <UiButton type="submit" :disabled="isUpdating">
                  {{ isUpdating ? 'Saving...' : 'Save Changes' }}
                </UiButton>
              </div>
            </form>
          </UiCardContent>
        </UiCard>

        <UiCard class="mt-6">
          <UiCardHeader>
            <UiCardTitle>Change Password</UiCardTitle>
            <UiCardDescription>
              Update your password
            </UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <form @submit.prevent="updatePassword" class="space-y-6">
              <div class="space-y-2">
                <UiLabel for="currentPassword">Current Password</UiLabel>
                <UiInput id="currentPassword" v-model="passwordForm.currentPassword" type="password"
                  placeholder="Enter your current password" />
              </div>

              <div class="space-y-2">
                <UiLabel for="newPassword">New Password</UiLabel>
                <UiInput id="newPassword" v-model="passwordForm.newPassword" type="password"
                  placeholder="Enter your new password" />
              </div>

              <div class="space-y-2">
                <UiLabel for="confirmPassword">Confirm New Password</UiLabel>
                <UiInput id="confirmPassword" v-model="passwordForm.confirmPassword" type="password"
                  placeholder="Confirm your new password" />
              </div>

              <div class="flex justify-end">
                <UiButton type="submit" :disabled="isUpdatingPassword">
                  {{ isUpdatingPassword ? 'Updating...' : 'Update Password' }}
                </UiButton>
              </div>
            </form>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'

definePageMeta({
  middleware: ['auth']
})

const userStore = useUserStore()
const user = computed(() => userStore.user)
const toast = useToast()

const isUpdating = ref(false)
const isUpdatingPassword = ref(false)

const form = ref({
  name: user.value?.name || '',
  email: user.value?.email || '',
  bio: '',
  location: ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const updateProfile = async () => {
  isUpdating.value = true

  try {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update user info in store
    // This is a simplified example
    userStore.currentUser = {
      ...userStore.currentUser,
      name: form.value.name
    }

    toast.addToast({
      title: 'Profile updated',
      description: 'Your profile has been updated successfully',
      type: 'success'
    })
  } catch (error) {
    console.error(error)
    toast.addToast({
      title: 'Error',
      description: 'Failed to update profile',
      type: 'error'
    })
  } finally {
    isUpdating.value = false
  }
}

const updatePassword = async () => {
  isUpdatingPassword.value = true

  try {
    // Validate passwords match
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
      toast.addToast({
        title: 'Error',
        description: 'New passwords do not match',
        type: 'error'
      })
      return
    }

    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reset form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    toast.addToast({
      title: 'Password updated',
      description: 'Your password has been updated successfully',
      type: 'success'
    })
  } catch (error) {
    console.error(error)
    toast.addToast({
      title: 'Error',
      description: 'Failed to update password',
      type: 'error'
    })
  } finally {
    isUpdatingPassword.value = false
  }
}

const logout = async () => {
  await userStore.logout()
  navigateTo('/')
}
</script>