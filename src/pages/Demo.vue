<template>
  <section class=" pa-10 overflow-y-auto overflow-x-hidden">
    <h1 class="text-h3 ">Este es un demo con cross validation</h1>
    <FormComponent :formdata="formData" />
  </section>
</template>

<script lang="ts" setup>
  import FormComponent from '@/components/FormComponent.vue';
  import { mockdata1 } from '@/assets/mocks';
  import type { FormSchema } from '@/types/index';
  import { ref } from 'vue';
  const formData = ref(mockdata1 as FormSchema);
//
</script>
