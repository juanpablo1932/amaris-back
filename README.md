# amaris-back

## Descripción

Prueba tecnica de backend para Amaris.
Comprende CRUD de citas, más servicio de autenticación.
Se abordaron pocas pruebas unitarias por motivos de tiempo.

- app.listen(3002)

## Variables de entorno

- Se elimino el **.env** del archivo **.gitignore** por motivos practicos y poder agilizar un poco más el proceso de revisión de la prueba.

## Inicio Docker

Ir a la raiz del proyecto por consola y ejecutar los siguientes comandos

```bash
$ npm i
$ docker-compose up -d
```

Luego de iniciar el contenedor ejecutamos el siguiente comando

```bash
$ docker-compose ps
```

copiamos el valor del parametro **NAME**

## Docker Compose

Abrimos el archivo **docker-compose.yml**.
Justo debajo de:

```yaml
ports:
  - ${PORT_DB}
```

Pondremos lo siguiente y reemplazaremos el valor del parametro **NAME**:

```yaml
app:
  image: aqui-el-valor-del-parametro-name
  restart: always
  ports:
    - 3002:3002
  depends_on:
    - db
```

Tendríamos al final algo similar a esto:

```yaml
version: "3.1"

services:
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - ${PORT_DB}
  app:
    image: amaris-back-db-1
    restart: always
    ports:
      - 3002:3002
    depends_on:
      - db
```

## Migraciones TypeORM

En la ruta **/src** encontraremos una carpeta llamada **migrations**, esta contiene el archivo de migraciones que se encargara de crear las tablas, además, poblará con algunos datos iniciales para poder hacer más practico el ejercicio.

Para realizar la migración ejecutaremos el siguiente comando

```bash
$ npm run typeorm:migration:run
```

## Correr app

```bash
$ npm run dev
```

## Prueba de endpoints

- Se podrá realizar login como miembro del staff (admin) o como paciente, al hacer el proceso de login se obtendrá en la respuesta el token de acceso para poder consumir los servicios.
- Entre las tablas generadas por el proceso de migración se encuentran las tablas de **staff**
  y **patients**, ambas tablas tienen 1 registro creado para poder llevar a cabo el proceso del login.
  Hay que aclarar que en estas tablas por practicidad y por no contar con un endpoint de registro las contraseñas no estan hasheadas, podría haberse resuelto con una dependencia como **bcrypt**, sin embargo, reiterando el tema de practicidad y por motivos de tiempo se ha dejado el password en la tabla sin hash.
- Adjunto en el correo donde se envio el link de estos repositorios se podrá encontrar la colección de los servicios.
