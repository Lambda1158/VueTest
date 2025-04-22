import type { FormField } from '@/types/'
import { VSelect, VTextField } from 'vuetify/components'
import type { Component } from 'vue'


// Función que recibe un array de validaciones y devuelve un array de funciones de validación
export function getValidationRules (
  validations: FormField['validations'],
  formValues: Record<string, string>
) {
  const rules: ((value: string) => true | string)[] = []

  validations?.forEach(v => {
    switch (v.type) {
      case 'required':
        rules.push(value => !!value || v.message)
        break

      case 'minLength':
        if (typeof v.value === 'number') {
          rules.push(value => value.length >= (v.value ?? 0) || v.message)
        }
        break

      case 'maxLength':
        if (typeof v.value === 'number') {
          rules.push(value => value.length <= (v.value ?? 0) || v.message)
        }
        break

      case 'regex':
        if (typeof v.pattern === 'string') {
          try {
            const regex = new RegExp(v.pattern)
            rules.push(value => regex.test(value) || v.message)
          } catch (e) {
            console.warn('Regex inválido:', v.pattern, e)
          }
        }
        break

      case 'complex':
        if (v.rules?.noNumbers) {
          rules.push(value => !/\d/.test(value) || v.message)
        }
        break

      case 'cross':
        if (v.dependsOn && v.condition) {
          rules.push(value => {
            const relatedValue = formValues[v.dependsOn as string]
            try {
              const conditionFn = new Function('value', 'relatedValue', `return ${v.condition}`)
              return conditionFn(value, relatedValue) || v.message
            } catch (err) {
              console.error('Error evaluando validación cruzada:', err)
              return 'Error en validación cruzada'
            }
          })
        }
        break

      default:
        break
    }
  })

  return rules
}

//  Tipado de componentes
const componentMap: Record<string, Component> = {
  text: VTextField,
  email: VTextField,
  number: VTextField,
  selectable: VSelect,
}

// Retorna un componente dependiendo del field que le llega
export function getVuetifyComponent (type: string): Component {
  return componentMap[type] || VTextField
}
