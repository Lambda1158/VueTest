export type ValidationType = 'required' | 'minLength' | 'maxLength' | 'regex' | 'complex' | 'cross'

export interface ValidationRule {
  type: ValidationType
  message: string
  value?: number
  pattern?: string
  dependsOn?: string
  condition?: string
  rules?: {
    noNumbers?: boolean
  }
}

export type FieldType = 'text' | 'email' | 'number' | 'selectable'

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
