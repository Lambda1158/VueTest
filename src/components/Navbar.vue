<template>
  <v-card>
    <v-layout class="h-screen">

      <v-navigation-drawer
        v-model="drawer"
        app
        class="bg-deep-purple"
        :permanent="isDesktop"
        :temporary="!isDesktop"
      >
        <v-list density="comfortable" nav>
          <v-list-item
            v-for="item in items"
            :key="item.key"
            :active="$route.path === item.path"
            class="mt-6 text-h6"
            :prepend-icon="item.icon"
            :title="item.title"
            :to="{ path: item.path }"
            :value="item.path"
          />
        </v-list>
      </v-navigation-drawer>


      <v-main>

        <v-app-bar class="d-md-none" color="deep-purple-darken-1" density="compact" flat>
          <v-btn icon @click="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <v-toolbar-title class="text-white">My App</v-toolbar-title>
        </v-app-bar>

        <router-view />
        <AppFooter />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useRoute } from 'vue-router'
  import AppFooter from './AppFooter.vue'

  const $route = useRoute()
  const { mdAndUp } = useDisplay()
  const drawer = ref(true)

  const isDesktop = computed(() => mdAndUp.value)

  const items = [
    { path: '/', title: 'Home', icon: 'mdi-view-dashboard', key: 1 },
    { path: '/form', title: 'Form Test', icon: 'mdi-forum', key: 2 },
    { path: '/demo', title: 'Demo', icon: 'mdi-star', key: 3 },
    { path: '/about', title: 'About', icon: 'mdi-account-multiple', key: 4 },
  ]
</script>
