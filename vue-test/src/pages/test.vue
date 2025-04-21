<script setup lang="ts">
  import { VSelect, VTextField } from 'vuetify/components'
  import { reactive } from 'vue'

  const formdata = {
    formTitle: 'Registro de Usuario',
    fields: [
      { name: 'nombre', label: 'Nombre', type: 'text', required: true },
      { name: 'vivienda', label: 'Vivienda', type: 'selectable', options: ['Casa', 'Dpto'], required: true },
    ],
  }

  const formValues = reactive({ nombre: '', vivienda: '' })

  const componentMap = {
    text: VTextField,
    email: VTextField,
    number: VTextField,
    selectable: VSelect,
  }

  function getVuetifyComponent (type) {
    return componentMap[type] || VTextField
  }
</script>

<template>
  <v-app>
    <v-container>
      <v-form>
        <v-row>
          <v-col v-for="(field, index) in formdata.fields" :key="index" cols="12">
            <component
              :is="getVuetifyComponent(field.type)"
              v-model="formValues[field.name]"
              dense
              :items="field.options || []"
              :label="field.label"
              outlined
              :required="field.required"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-app>
</template>
