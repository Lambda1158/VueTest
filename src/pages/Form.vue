<template>
  <section class="pa-10 overflow-y-auto">
    <h1 class="text-h3">Esta seccion tiene el formulario</h1>
    <FormComponent :formdata="formData" />
  </section>
</template>

<script lang="ts" setup>
  import FormComponent from '@/components/FormComponent.vue';
  import { ref } from 'vue';
  import rawSchema from '@/assets/formulatio.json';
  import type { FormSchema } from '@/types/index';
  const formData = ref (rawSchema as FormSchema);
</script>
