import type { FormField } from '@/types/'
import { VSelect, VTextField } from 'vuetify/components'
import type { Component } from 'vue'

export default function getValidationRules (validations: FormField['validations']) {
  const rules: ((value: string) => true | string)[] = []

  validations?.forEach(v => {
    switch (v.type) {
      case 'required':
        rules.push(value => !!value || v.message)
        break

      case 'minLength':
        rules.push(value => value.length >= (v.value || 0) || v.message)
        break

      case 'maxLength':
        rules.push(value => value.length <= (v.value || 9999) || v.message)
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

//  Tipado del mapping
export const componentMap: Record<string, Component> = {
  text: VTextField,
  email: VTextField,
  number: VTextField,
  selectable: VSelect,
}

export function getVuetifyComponent (type: string): Component {
  return componentMap[type] || VTextField
}
