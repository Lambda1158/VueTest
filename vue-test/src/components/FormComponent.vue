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
  import { FormSchema } from '@/types/index';
  import { FormField } from '@/types/index'


  // 🟩 Props tipados
  const props = defineProps<{
    formdata: FormSchema
  }>()

  // 🟦 Valores del form, inicializados con `default`
  const formValues: Record<string, string> = reactive({})

  props.formdata.fields.forEach((field: FormField) => {
    formValues[field.name] = field.default || ''
  })

  // 🟪 Tipado del mapping
  const componentMap: Record<string, any> = {
    text: VTextField,
    email: VTextField,
    number: VTextField,
    selectable: VSelect,
  }

  function getVuetifyComponent (type: string): any {
    return componentMap[type] || VTextField
  }

  const emit = defineEmits(['update:modelValue'])

  watch(formValues, newVal => {
    emit('update:modelValue', newVal)
  })
</script>
