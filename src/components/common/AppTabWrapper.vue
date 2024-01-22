<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMarvelStore } from '@/stores/marvel'
const { marvelCharacter } = storeToRefs(useMarvelStore())

import Tabs from '@/components/common/AppTabs.vue'
import Tab from '@/components/common/AppTab.vue'
import AppList from './AppList.vue'

const tabs = ['Comics', 'Series', 'Stories', 'Events']
</script>

<template>
  <Tabs :tabs="tabs">
    <Tab title="Comics">
      <AppList :list="marvelCharacter?.comics?.items ?? []" />
    </Tab>

    <Tab title="Series">
      <AppList :list="marvelCharacter?.series?.items ?? []" />
    </Tab>

    <Tab title="Stories">
      <AppList :list="marvelCharacter?.stories?.items ?? []" />
    </Tab>

    <Tab title="Events">
      <AppList :list="marvelCharacter?.events?.items ?? []" />
    </Tab>
  </Tabs>
</template>
