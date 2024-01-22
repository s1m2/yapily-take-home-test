<script setup lang="ts">
import { ref, provide } from 'vue'

const props = defineProps<{
  tabs: string[]
}>()

const currentTab = ref(props.tabs[0])

provide('selectedTab', currentTab)

function selectTab(tab: string) {
  currentTab.value = tab
}
</script>

<template>
  <div class="pb-8">
    <div class="flex gap-5 mb-4 overflow-x-auto">
      <button
        class="text-sm md:text-3xl text-white -skew-x-6 p-3 transition-all"
        :class="{ 'bg-red-600': currentTab === tab, 'hover:text-red-600': currentTab !== tab }"
        v-for="(tab, index) in tabs"
        :key="index"
        data-cy="tab-button"
        @click="selectTab(tab)"
      >
        {{ tab }}
      </button>
    </div>

    <slot />
  </div>
</template>
