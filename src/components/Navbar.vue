<template>
  <v-card>
    <v-layout class="h-screen">
      <v-navigation-drawer class="bg-deep-purple" floating permanent>
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
        <router-view />
      </v-main>
      <AppFooter />
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import AppFooter from './AppFooter.vue';
  const $route = useRoute()
  const items = [
    { path:'/', title:'Home', icon:'mdi-view-dashboard', key:1 },
    { path:'/form', title:'Form Test', icon:'mdi-forum',key:2 },
    { path:'/demo', title:'Demo', icon:'mdi-star', key:3 },
    { path:'/about', title:'About', icon:'mdi-account-multiple', key:4 },
  ]
</script>
