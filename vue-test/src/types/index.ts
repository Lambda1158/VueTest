// src/types/form.ts
export type ValidationType = 'required' | 'minLength' | 'maxLength' | 'regex' | 'complex'

export interface ValidationRule {
  type: ValidationType
  message: string
  value?: number
  pattern?: string
  rules?: {
    noNumbers?: boolean
  }
}

export type FieldType = 'text' | 'email' | 'number' | 'selectable' // Asegúrate que coincida con tu JSON

export interface FormField {
  name: string
  label: string
  type: FieldType // Usa el tipo específico, no string
  default?: string
  maxLength?: number
  required?: boolean
  validations?: ValidationRule[]
  options?: string[] // Para campos selectable
}

export interface FormSchema {
  formTitle: string
  fields: FormField[]
}
