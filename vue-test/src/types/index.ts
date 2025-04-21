// src/types/form.ts
export type FieldType = 'text' | 'email' | 'number' | 'select'

export interface ValidationRule {
  type: string
  message: string
  value?: number
  pattern?: string
}

export interface FormField {
  name: string
  label: string
  type: FieldType
  default?: string
  maxLength?: number
  required?: boolean
  validations?: ValidationRule[]
  options?: string[]
}

export interface FormSchema {
  formTitle: string
  fields: FormField[]
}
