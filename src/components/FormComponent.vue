<template>
  <v-form ref="formRef" v-model="formValid" class="overflow-y-auto overflow-x-hidden pa-2">
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
          :rules="getValidationRules(field.validations, formValues)"
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
  import type { FormField , FormSchema } from '@/types/index'
  import { ref } from 'vue'
  import type { VForm } from 'vuetify/components'
  import { getValidationRules } from '@/utils'
  import { getVuetifyComponent } from '@/utils'

  const formRef = ref<InstanceType<typeof VForm> | null>(null)
  const formValid = ref(false)
  const STORAGE_KEY = 'formData'
  const storedData = localStorage.getItem(STORAGE_KEY)
  const dynamicRules: Record<string, ((value: string) => true | string)[]> = reactive({})
  //  Props tipados
  const props = defineProps<{
    formdata: FormSchema
  }>()

  //  Valores del form, inicializados con `default`
  const formValues: Record<string, string> = reactive(
    storedData ? JSON.parse(storedData) : {}
  )

  props.formdata.fields.forEach((field: FormField) => {
    if (!(field.name in formValues)) {
      formValues[field.name] = field.default || ''
    }
  })

  props.formdata.fields.forEach(field => {
    field.validations?.forEach(v => {
      if (v.type === 'cross' && v.dependsOn && v.condition) {
        watch(
          () => formValues[v.dependsOn],
          val => {
            const conditionMet = eval(`(value) => ${v.condition}`)(val)

            if (conditionMet) {
              dynamicRules[field.name] = [
                ...(dynamicRules[field.name] || []),
                (value: string) => !!value || v.message,
              ]
            } else {
              dynamicRules[field.name] = []
            }
          },
          { immediate: true }
        )
      }
    })
  })

  function clearForm () {
    localStorage.removeItem(STORAGE_KEY)
    Object.keys(formValues).forEach(key => {
      formValues[key] = ''
    })
  }


  async function submitForm () {
    const result = await formRef.value?.validate()
    if (result?.valid) {
      try {
        // Simular error random
        if (Math.random() < 0.5) throw new Error('Simulación de fallo')

        console.log('Formulario enviado con éxito:', formValues)
      } catch (err) {
        console.error('Error al enviar:', err)
        alert('Error al enviar formulario. Intente de nuevo.')
      }
    }
  }


  watch(
    () => formValues,
    newValues => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValues))
    },
    { deep: true }
  )

</script>
