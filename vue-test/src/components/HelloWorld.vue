<template>
  <div class="d-flex justify-center align-center flex-column fill-height">
    <div>
      <v-img class="mb-4" height="150" src="@/assets/logo.png" />
      <div class="mb-8 text-center">
        <div class="text-h3 font-weight-light mb-4">Welcome to my Vue test</div>
        <h1 class="text-h1 font-weight-bold">Vuetify</h1>
      </div>
    </div>
    <v-container class="text-center">
      <v-btn class="ma-2" color="primary" size="x-large" @click="$router.push('/form')">Go to Forms</v-btn>
      <v-btn class="ma-2" color="primary" size="x-large" @click="$router.push('/about')">About me</v-btn>
    </v-container>
  </div>
</template>

<script setup lang="ts"></script>
