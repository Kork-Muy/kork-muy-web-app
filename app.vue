<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto py-8">
      <h1 class="text-4xl font-bold text-primary mb-8">Nuxt 3 + Tailwind CSS + Pinia + shadcn-vue</h1>
      
      <div class="bg-card p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Counter Example</h2>
        <div class="flex items-center gap-4">
          <button 
            @click="counter.decrement()"
            class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
          >
            Decrement
          </button>
          <span class="text-2xl font-bold">{{ counter.count }}</span>
          <button 
            @click="counter.increment()"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Increment
          </button>
        </div>
        <p class="mt-4 text-muted-foreground">Double count: {{ counter.doubleCount }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '~/stores/counter'

const counter = useCounterStore()
</script>
