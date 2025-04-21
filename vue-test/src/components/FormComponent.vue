<template>
  <v-form>
    <h2 class="mb-4">{{ props.formdata.formTitle }}</h2>
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
