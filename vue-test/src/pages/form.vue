<template>
  <section class="pa-10 overflow-y-auto overflow-x-hidden h-screen">
    <v-container class="d-flex justify-center align-center ">
      <v-col class="align-center justify-center">
        <FormComponent :formdata="formData" />
      </v-col>
    </v-container>
  </section>
</template>

<script lang="ts" setup>
  import FormComponent from '@/components/FormComponent.vue';
  import { ref } from 'vue';
  import rawSchema from '@/assets/formulatio.json';
  import type { FormSchema } from '@/types/index';
  const formData = ref (rawSchema as FormSchema);
</script>
