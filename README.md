# Mascotopia

Bienvenido a Mascotopía, tu centro integral para el cuidado de mascotas y comunidad

En mascotopia, estamos dedicados a proveerte una plataforma comprehensiva donde los dueños de mascotas pueden conectarse, compartir experiencias, y acceder a valiosos recursos como foros, listados de mascotas perdidas y las últimas noticias de mascotas

## Equipo de trabajo

Los Reales Brrrrr

## Integrantes (nombre - usuario Github):

- Nicolás Felipe Arciniegas Lizarazo - [narciniegasl](https://github.com/narciniegasl)
- Laura Valentina Pabón Cabezas - [lauvale029](https://github.com/lauvale029)
- Diana Valentina Chicuasuque Rodriguez - [ValentinaChicua](https://github.com/ValentinaChicua)
- Manuel Eduardo Quintana Umbarila - [mquintanau](https://github.com/mquintanau)
- Laura Daniela Agudelo Cruz - [laurad08412](https://github.com/laurad08412)
- Juan David Madrid Contreras - [JuMad-SE](https://github.com/JuMad)
- Carlos David Ramirez Muñoz - [w1sec0d](https://github.com/w1sec0d)

## Despliegue

Puedes acceder directamente a la app aqui: [Link con despliegue de la aplicación](https://mascotopia-fe.onrender.com/)

## Instalación

Sigue estos pasos para ejecutar en modo de desarrollo la aplicación

### Vista

Para instalar y ejecutar el proyecto de React, sigue estos pasos:

1. Abre una terminal y navega hasta la carpeta `view` de este proyecto.
2. Asegúrate de tener Node.js instalado en tu sistema. Puedes verificarlo ejecutando el siguiente comando en la terminal:
   ```
   node --version
   ```
   Si no tienes Node.js instalado, puedes descargarlo e instalarlo desde [https://nodejs.org](https://nodejs.org).
3. Una vez que tienes Node.js instalado, ejecuta el siguiente comando en la terminal para instalar las dependencias del proyecto:
   ```
   npm install
   ```
4. Después de que se completen las instalaciones, puedes ejecutar el proyecto con el siguiente comando:
   ```
   npm start
   ```
   Esto iniciará el servidor de desarrollo y podrás acceder a la vista de la aplicación en tu navegador

### Controlador

Para iniciar el controlador de este proyecto de Express con Mongoose, sigue estos pasos:

1. Abre una terminal y navega hasta la carpeta `controller` de este proyecto.
2. Asegúrate de tener Node.js instalado en tu sistema. Puedes verificarlo ejecutando el siguiente comando en la terminal:
   ```
   node --version
   ```
   Si no tienes Node.js instalado, puedes descargarlo e instalarlo desde [https://nodejs.org](https://nodejs.org).
3. Asegúrate de tener MongoDB instalado y en ejecución en tu sistema. Puedes verificarlo ejecutando el siguiente comando en la terminal:
   ```
   mongo --version
   ```
   Si no tienes MongoDB instalado, puedes descargarlo e instalarlo desde [https://www.mongodb.com](https://www.mongodb.com).
4. Una vez que tienes Node.js y MongoDB instalados, ejecuta el siguiente comando en la terminal para instalar las dependencias del proyecto:
   ```
   npm install
   ```
5. Después de que se completen las instalaciones, puedes iniciar el controlador con el siguiente comando:
   ```
   npm start
   ```
   Esto iniciará el servidor de Express y podrás acceder a las rutas definidas en el controlador.

Recuerda que para que el controlador funcione correctamente, debes tener una conexión válida a la base de datos MongoDB y configurar las variables de entorno necesarias en un archivo `.env` en la raíz del proyecto. Para esto puedes añadir en el .env las variables DB_CONNECTION_STRING (con tu string de conexión a la base de datos mongoDB), ACCESS_TOKEN_SECRET y REFRESH_TOKEN_SECRET
