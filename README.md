# 🛍️ Wallapop Next

Marketplace desarrollado con **Next.js 16**, **React**, **TypeScript** y **Prisma ORM** como práctica de React Avanzado.

La aplicación permite a los usuarios publicar anuncios, explorar productos, dar "Me gusta", comentar publicaciones y administrar sus propios anuncios.

---

# 🚀 Funcionalidades

- Registro e inicio de sesión de usuarios
- Publicación de anuncios con imágenes
- Edición y eliminación de anuncios propios
- Catálogo de anuncios
- Búsqueda por texto
- Filtrado por categorías
- Ordenamiento de resultados
- Paginación
- Sistema de comentarios
- Sistema de "Me gusta"
- Subida de imágenes
- Seed de datos para pruebas

---

# 🧠 Tecnologías

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- Zod
- Vitest
- Playwright

---

# 🏗️ Arquitectura

El proyecto sigue la estructura recomendada por **Next.js App Router**, separando la lógica en diferentes módulos:

- App Router
- Server Actions
- Prisma ORM
- Componentes reutilizables
- Validaciones con Zod

---

# 📦 Instalación del proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/Adyanna/WallaPopNext.git
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar las variables de entorno

Crear un archivo `.env` utilizando como referencia el archivo `.env.example`.

Configurar principalmente:

- DATABASE_URL
- AUTH_SECRET

---

## 4. Ejecutar las migraciones

```bash
npx prisma migrate dev
```

Generar el cliente de Prisma:

```bash
npx prisma generate
```

---

## 5. Poblar la base de datos

```bash
npx prisma seed
```

Este comando creará usuarios, anuncios, comentarios y "Me gusta" de ejemplo para facilitar las pruebas.

---

## 6. Ejecutar la aplicación

```bash
npm run dev
```

---

# 🧪 Ejecutar pruebas

Tests unitarios con Vitest:

```bash
npm run test
```

---

# 📌 Funcionalidades principales

## Usuarios

- Registro
- Inicio de sesión
- Cierre de sesión

## Anuncios

- Crear anuncio
- Editar anuncio
- Eliminar anuncio
- Buscar anuncios
- Filtrar anuncios
- Paginación

## Interacción

- Dar y quitar "Me gusta"
- Comentar anuncios

---

# 👩‍💻 Autor

Desarrollado por **Milka Cutipa** como práctica de **React Avanzado** utilizando **Next.js**, **TypeScript**, **Prisma ORM** y **PostgreSQL**.
