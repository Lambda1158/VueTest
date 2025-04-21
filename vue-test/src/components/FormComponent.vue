<template>
  <v-form>
    <h4 class="mb-6 text-h4">{{ props.formdata.formTitle }}</h4>
    <v-row>
      <v-col v-for="(field, index) in formdata.fields" :key="index" cols="12">
        <component
          :is="getVuetifyComponent(field.type)"
          v-model="formValues[field.name]"
          dense
          :items="field.options || []"
          :label="field.label"
          :maxlength="field.maxLength"
          outlined
          :required="field.required"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-between">
      <v-btn class="flex-grow-1 mx-2" color="primary" size="x-large" @click="clearForm">Limpear Form</v-btn>
      <v-btn class="flex-grow-1 mx-2" color="primary" size="x-large">Submit</v-btn>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { VSelect, VTextField } from 'vuetify/components'
  import type { Component } from 'vue'
  import type { FormField , FormSchema } from '@/types/index'
  const STORAGE_KEY = 'formData'
  const storedData = localStorage.getItem(STORAGE_KEY)

  //  Props tipados
  const props = defineProps<{
    formdata: FormSchema
  }>()

  //  Valores del form, inicializados con `default`
  const formValues: Record<string, string> = reactive(
    storedData ? JSON.parse(storedData) : {}
  )


  //  Tipado del mapping
  const componentMap: Record<string, Component> = {
    text: VTextField,
    email: VTextField,
    number: VTextField,
    selectable: VSelect,
  }

  function getVuetifyComponent (type: string): Component {
    return componentMap[type] || VTextField
  }
  function clearForm () {
    localStorage.removeItem(STORAGE_KEY)
    Object.keys(formValues).forEach(key => {
      formValues[key] = ''
    })
  }

  props.formdata.fields.forEach((field: FormField) => {
    if (!(field.name in formValues)) {
      formValues[field.name] = field.default || ''
    }
  })

  watch(
    () => formValues,
    newValues => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValues))
    },
    { deep: true }
  )


</script>
