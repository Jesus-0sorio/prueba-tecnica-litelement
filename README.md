# Prueba Técnica LitElement - Pokedex

## Descripción

Esta aplicación web utiliza LitElement para crear una Pokedex que permite explorar información sobre Pokémon y sus evoluciones. La aplicación está desarrollada con JavaScript, se enfoca en la construcción modular usando componentes visuales y de lógica en LitElement.

## Requerimientos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (versión 18 o superior es recomendada).
- **npm** (administrador de paquetes de Node.js).

Sigue los pasos a continuación para configurar y ejecutar el proyecto.

## Instrucciones de Instalación

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```sh
git clone https://github.com/Jesus-0sorio/prueba-tecnica-litelement.git
cd prueba-tecnica-litelement
```

### 2. Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias necesarias:

```sh
npm install
```

### 3. Iniciar el servidor JSON y la aplicación

Abre **dos terminales**:

- En la **primera terminal**, inicia el servidor JSON ejecutando el siguiente comando:

  ```sh
  npm run server
  ```

  Esto iniciará el servidor JSON en http://localhost:3001.
- En la **segunda terminal**, inicia la aplicación de desarrollo con Vite:
  ```sh
  npm run dev
  ```
  La aplicación de Lit se ejecutará en http://localhost:5173.

### Uso de la Aplicación
La aplicación muestra una lista de Pokémon con su nombre, tipo e imagen. Al seleccionar un Pokémon, se muestra su lista de evoluciones (si existen), junto con un formulario de edición donde puedes modificar la información de las evoluciones. Incluye una opción para marcar si el Pokémon está repetido; si está activada, aparece un modal informativo.