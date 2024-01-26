# Logistic Hub Order Delivery

## Dependencias

1. Tener levantado el microservicio Carrier
   Management ([Repo](https://gitlab.com/apernet/stores/services/aper.carrier.management))
2. node (>=16), docker, python (>=3.7), pip

## Instalación Local de SQS (Linux)

1. Instalar awslocal

  ```sh
  $ pip install awscli-local
  ```

2. Instalar localstack

  ```sh
  $ python3 -m pip install localstack
  ```

3. Iniciar localstack

  ```sh
  $ localstack start
  ```

4. Crear SQS queue

  ```sh
  $ awslocal sqs create-queue --queue-name sample-queue
  ```

5. Verificar que se haya creado la sqs queue y luego verificar que coincida con la url en LOCALSTACK_SQS_ENDPOINT del
   config.ts. Si no cambiarla.

  ```sh
  $ awslocal sqs list-queues
  {
    "QueueUrls": [
        "http://localhost:4566/000000000000/sample-queue"
    ]
  }
  ```

## Instalación Local (Linux)

1. Clonar el repositorio de la aplicación
   ```sh
   git@gitlab.com:apernet/stores/services/aper.logistichub.orderdelivery.git
   ```
2. Crear .env en base a .env.example
   ```sh
   cp .env.example .env
   ```
3. Configurar variables de entorno con los datos de su base de datos local y la url local del microservicio Carrier
   Management
   ```sh
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   DB_HOST_READ=
   DB_PORT_READ=
   DB_HOST_WRITE=
   DB_PORT_WRITE=
   CARRIER_MANAGEMENT_API_URL=http://localhost:9001/api
   ```

4. Instalar dependencias
   ```sh
   $ yarn install
   $ yarn run build
   ```
5. Iniciar la aplicación
   ```sh
   $ yarn run start
   ```

## Endpoints

* Healthcheck: http://localhost:3000/api/healthcheck (GET)
* Documentación Swagger: http://localhost:3000/docs/

## Comandos

Otros comandos utiles:

- `awslocal sqs receive-message --queue-url {QUEUE_URL}`: Show received message of SQS
- `yarn run start`: Start the application in dev mode
- `yarn start seed`: Start the application in dev mode and seed the database tables
- `yarn run debug`: Start the application in debug mode
- `yarn run test`: Run the unit tests
- `yarn run coverage`: Run the unit tests & generates the coverage report
- `yarn run serve:production"`: Start the application in production mode. You need to run mode `yarn run build` first.
- `yarn run lint"`: Run the code linter.

## Docker

1. cp .env.example .env

2. docker build -t aper.logistichub.orderdelivery .

3. docker run -d -p ${PORT}:3000 aper.logistichub.orderdelivery

## Documentación

- [Documentación en Confluence](https://aper.atlassian.net/l/cp/odYKCe6A)
