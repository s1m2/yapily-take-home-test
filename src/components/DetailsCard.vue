<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '@/types/character'

const props = defineProps<{
  character: Character
  isEditMode: boolean
  modelValue: string
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})
</script>

<template>
  <h3 class="text-5xl text-white font-extrabold mb-5">Name</h3>
  <p class="text-white text-4xl font-semibold mb-5" v-if="!isEditMode">
    {{ model }}
  </p>
  <input type="text" id="name" v-model="model" v-if="isEditMode" class="mb-5 p-4 w-full" />
  <h3 class="text-5xl text-white font-extrabold mb-5">Description</h3>
  <p v-if="character.description" class="text-white text-xl font-semibold mb-8">{{ character.description }}</p>
  <p v-else class="text-white text-xl font-semibold mb-8">No description available yet. Keep a look out</p>
</template>
