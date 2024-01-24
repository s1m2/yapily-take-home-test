<script setup lang="ts">
import type { Character } from '@/types/character'
import { checkImagePath } from '@/lib/utils'
defineProps<{ character: Character }>()
</script>

<template>
  <router-link
    data-cy="hero-card"
    :to="`/hero/${character.id}`"
    class="group relative cursor-pointer transition-all hover:scale-105"
  >
    <img
      :src="checkImagePath(character)"
      :alt="character.name"
      class="shadow-2xl object-cover h-72 w-full overflow-hidden"
    />
    <span
      class="hidden absolute top-28 left-40 text-xl bg-red-600 text-white p-2 -skew-x-6 group-hover:block transition-all"
    >
      {{ character.name }}
    </span>
  </router-link>
</template>
