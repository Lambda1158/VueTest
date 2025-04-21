<template>
  <section class="d-flex flex-column justify-center align-center fill-height">
    <v-container class="d-flex justify-center align-center">
      <v-row class="align-center justify-center">
        <v-col>
          <h1 class="mb-4 text-h3">Lista de Formulario</h1>
          <v-text-field label="Cambios en el form??" max-width="500" />
          <v-btn
            color="primary"
            max-width=""
            size="x-large"
            :width="500"
            @click="$router.push('/')"
          >Take me
            back</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>Hola este es el form</h1>
          <FormComponent />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts" setup>
  import FormComponent from '@/components/FormComponent.vue';
  import { ref } from 'vue';
  import formSchema from '@/assets/formSchema.json';
  import type { FormSchema } from '@/types/index';
</script>
