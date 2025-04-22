export const mockdata1 = {
  formTitle: 'Test de cross validation',
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Correo electrónico',
      default: '',
      required: true,
      validations: [
        { type: 'required', message: 'El email es obligatorio' },
        { type: 'regex', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'Email inválido' },
      ],
    },
    {
      name: 'password',
      type: 'text',
      label: 'Contraseña',
      default: '',
      required: true,
      validations: [
        { type: 'required', message: 'La contraseña es obligatoria' },
        { type: 'minLength', value: 6, message: 'Debe tener al menos 6 caracteres' },
      ],
    },
    {
      name: 'repeatPassword',
      type: 'text',
      label: 'Repetir contraseña',
      default: '',
      required: true,
      validations: [
        { type: 'required', message: 'Debes repetir la contraseña' },
        {
          type: 'cross',
          dependsOn: 'password',
          condition: 'value === relatedValue',
          message: 'Las contraseñas no coinciden',
        },
      ],
    },
  ],
}
