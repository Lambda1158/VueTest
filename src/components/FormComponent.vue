<template>
  <div class="">
    <v-form ref="formRef" v-model="formValid" style="max-width: 800px;">
      <h4 class="mb-6 mt-4 text-h4">{{ props.formdata.formTitle }}</h4>

      <v-row>
        <v-col
          v-for="(field, index) in formdata.fields"
          :key="index"
          cols="6"
          md="6"
        >
          <component
            :is="getVuetifyComponent(field.type)"
            v-model="formValues[field.name]"
            class="custom-form-field"
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

      <v-row class="d-flex justify-space-between mt-6">
        <v-col cols="12" sm="4">
          <v-btn block color="success" @click="validate">Validate</v-btn>
        </v-col>
        <v-col cols="12" sm="4">
          <v-btn block color="error" @click="clearForm">Reset Form</v-btn>
        </v-col>
        <v-col cols="12" sm="4">
          <v-btn block color="warning" @click="submitForm">Send Info!!</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import type { FormField , FormSchema } from '@/types/index'
  import type { VForm } from 'vuetify/components'
  import { getValidationRules } from '@/utils'
  import { getVuetifyComponent } from '@/utils'

  const formRef = ref<InstanceType<typeof VForm> | null>(null)
  const formValid = ref(false)

  //  Traigo el form desde el padre
  const props = defineProps<{
    formdata: FormSchema
  }>()

  const STORAGE_KEY = 'formData'+props.formdata.formTitle.replace(/\s+/g, '')
  console.log('STORAGE_KEY', STORAGE_KEY)
  const storedData = localStorage.getItem(STORAGE_KEY)
  const dynamicRules: Record<string, ((value: string) => true | string)[]> = reactive({})


  //  Cargo valores del form si existen en el localstorage
  const formValues: Record<string, string> = reactive(
    storedData ? JSON.parse(storedData) : {}
  )

  // Cargo en formValues los valores q existan y los que no quedan con default
  props.formdata.fields.forEach((field: FormField) => {
    if (!(field.name in formValues)) {
      formValues[field.name] = field.default || ''
    }
  })

  // Cargo las validaciones de cada campo si es que tienen y les agrego el watcher para las validaciones cruzadas
  props.formdata.fields.forEach(field => {
    field.validations?.forEach(v => {
      if (v.type === 'cross' && v.dependsOn && v.condition) {
        const dependsOn = v.dependsOn
        const condition = v.condition
        watch(
          () => [formValues[dependsOn], formValues[field.name]],
          ([relatedValue, value]) => {
            const isValid = new Function('value', 'relatedValue', `return ${condition}`)(value, relatedValue)

            if (isValid) {
              dynamicRules[field.name] = [
                ...(dynamicRules[field.name] || []),
                (value: string) => !!value || v.message,
              ]
            } else {
              dynamicRules[field.name] = [
                () => v.message,
              ]
            }
          },
          { immediate: true }
        )
      }
    })
  })

  // Funcion limpea el form y el localstorage
  function clearForm () {
    localStorage.removeItem(STORAGE_KEY)
    Object.keys(formValues).forEach(key => {
      formValues[key] = ''
    })
  }

  // Funcion hace el submit del form y simula un error
  async function submitForm () {
    const result = await formRef.value?.validate()
    if (result?.valid) {
      try {
        // Simular error random
        if (Math.random() < 0.5) throw new Error('Simulación de fallo')

        console.log('Formulario enviado con éxito:', formValues)
        return alert('Formulario enviado con éxito 🙂 ')
      } catch (err) {
        console.error('Error al enviar:', err)
        alert('Error al enviar formulario. Intente de nuevo.')
      }
    }
  }

  // Valida el formulario
  async function validate () {
    const result = await formRef.value?.validate()
    return result?.valid ? alert('Formulario válido 🙂 ') : alert('Formulario inválido 😠 ')
  }

  // Cada vez que se edita un field en el form se guarda en el localstorage
  watch(
    () => formValues,
    newValues => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValues))
    },
    { deep: true }
  )
</script>
