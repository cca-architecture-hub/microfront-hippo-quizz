
## Configuración de AWS CLI
Instalar ```aws cli``` 

Una vez instalada hay que configurarla:

```
aws configure
```

Paso a paso cómo generar las credenciales desde la consola de AWS:

1. Acceder a IAM:
* Inicia sesión en la consola de AWS  
* Ve al servicio IAM (Identity and Access Management)
* En el menú lateral, selecciona "Users"
* Selecciona tu usuario o crea uno nuevo

2. Crear Access Key:
* Ve a la pestaña "Security credentials"
* Busca la sección "Access keys"
* Click en "Create access key"
* Selecciona "Command Line Interface (CLI)"
* Marca la casilla de confirmación
* Click "Next"

3. Guardar credenciales:
* Se mostrarán:
* Access key ID
* Secret access key
* ¡IMPORTANTE! Esta es la única vez que verás la Secret Key
* Descarga el archivo .csv o copia las credenciales inmediatamente

## Creación de bucket y despliegue

Creamos el bucket en la región específica y con el nombre de nuestro proyecto
```
aws s3api create-bucket --bucket quiz-question-app --region eu-west-3 --create-bucket-configuration LocationConstraint=eu-west-3
```

Habilitamos el modo website, para que S3 sirva contenido estático
```
aws s3 website s3://quiz-question-app --index-document index.html --error-document index.html
```

Actualizamos los permisos para que se pueda leer de manera pública
```
aws s3api put-public-access-block --bucket quiz-question-app --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
```

Ponemos la política al bucket
```
aws s3api put-bucket-policy --bucket quiz-question-app --policy file://policy.json
```

Subimos el código generado en nuestro local a S3
```
aws s3 sync dist s3://quiz-question-app
```
