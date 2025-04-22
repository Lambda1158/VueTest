# 🧩 Form Generator con Validaciones Dinámicas - Vuetify 3 + Vue 3 + TypeScript

Este proyecto consiste en un generador de formularios dinámicos usando Vue 3, Vuetify 3 y TypeScript. Permite construir formularios a partir de estructuras JSON, incluyendo validaciones simples y cruzadas entre campos.

---

## 🚀 Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tu-repo.git

# Ingresar a la carpeta del proyecto
cd tu-repo

# Instalar dependencias
npm install

# Ejecutar la app en modo desarrollo
npm run dev
```

---

## 📐 Decisiones de Diseño

### Estructura del JSON

La estructura del JSON fue diseñada para ser **flexible, extensible y fácil de mantener**. Cada formulario se define como un objeto que contiene un título (`formTitle`) y una lista de campos (`fields`), donde cada campo describe su tipo, etiqueta, nombre y validaciones asociadas. Esto permite que el sistema pueda interpretar y renderizar formularios dinámicamente sin necesidad de modificar el código fuente cada vez que se necesite un nuevo formulario.

Opté por usar claves claras como `type`, `label`, `name` y `validations`, inspirándome en esquemas de formularios usados en librerías como Formik o Yup, pero adaptados al ecosistema de Vuetify. La idea es que el mismo sistema pueda soportar múltiples tipos de entrada (`text`, `select`, `email`, etc.) con solo cambiar el JSON, lo que lo hace ideal para entornos donde se requieren formularios personalizables y reusables.

### Implementación de las Validaciones

El sistema de validaciones fue pensado para ser **declarativo y desacoplado del componente Vue**. Cada campo puede incluir un array de validaciones, donde cada validación indica su tipo (`required`, `minLength`, `regex`, etc.), el valor esperado y un mensaje personalizado.

Se implementaron también **validaciones complejas y cruzadas** mediante una validación de tipo `cross`, que permite definir una condición lógica usando otra variable del formulario. Esto permite validar casos como "confirmar contraseña", o aplicar reglas dinámicas basadas en la selección de otro campo. Estas validaciones se resuelven en tiempo real utilizando `watchers` de Vue 3 y funciones dinámicas generadas con `new Function()`.

Esta arquitectura permite que el sistema de formularios sea altamente escalable, facilitando tanto la extensión de nuevas reglas como la integración de condiciones más avanzadas sin romper el diseño original.

---

## ✅ Funcionalidades implementadas

- [x] Carga dinámica de campos desde JSON
- [x] Validaciones por tipo (`required`, `minLength`, `regex`, etc.)
- [x] Validaciones cruzadas (`cross`)
- [x] Reset del formulario
- [x] Validación manual (`Validate`) y envío simulado (`Send Info`)

---
