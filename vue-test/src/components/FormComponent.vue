<template>
  <v-form ref="formRef" v-model="formValid">
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
          :rules="getValidationRules(field.validations)"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-between">
      <v-btn class="flex-grow-1 mx-2" color="primary" size="x-large" @click="clearForm">Limpear Form</v-btn>
      <v-btn class="flex-grow-1 mx-2" color="primary" size="x-large" @click.prevent="submitForm">Submit</v-btn>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { VSelect, VTextField } from 'vuetify/components'
  import type { Component } from 'vue'
  import type { FormField , FormSchema } from '@/types/index'
  import { ref } from 'vue'
  import type { VForm } from 'vuetify/components'

  const formRef = ref<InstanceType<typeof VForm> | null>(null)
  const formValid = ref(false)
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

  async function submitForm () {
    const result = await formRef.value?.validate()

    if (result?.valid) {
      console.log('Formulario válido:', formValues)
    } else {
      console.log('Formulario inválido')
    }
  }

  props.formdata.fields.forEach((field: FormField) => {
    if (!(field.name in formValues)) {
      formValues[field.name] = field.default || ''
    }
  })

  function getValidationRules (validations: FormField['validations']) {
    const rules: ((value: string) => true | string)[] = []

    validations?.forEach(v => {
      switch (v.type) {
        case 'required':
          rules.push(value => !!value || v.message)
          break

        case 'minLength':
          rules.push(value =>
            value.length >= (v.value || 0) || v.message
          )
          break

        case 'maxLength':
          rules.push(value =>
            value.length <= (v.value || 9999) || v.message
          )
          break

        case 'regex':
          try {
            const regex = new RegExp(v.pattern)
            rules.push((value: string) => {
              if (typeof value !== 'string') return v.message
              return regex.test(value) || v.message
            })
          } catch (e) {
            console.warn('Regex inválido:', v.pattern)
          }
          break

        case 'complex':
          if (v.rules?.noNumbers) {
            rules.push(value => !/\d/.test(value) || v.message)
          }
          break

        default:
          break
      }
    })

    return rules
  }


  watch(
    () => formValues,
    newValues => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValues))
    },
    { deep: true }
  )


</script>
