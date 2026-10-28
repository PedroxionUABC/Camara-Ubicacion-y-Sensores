# Explorador móvil

Aplicación hecha con Expo y React Native para la práctica de laboratorio de Desarrollo de Aplicaciones Móviles. Tiene tres módulos: una cámara para tomar fotos, una pantalla que muestra la ubicación actual y una brújula que lee el magnetómetro del teléfono.

## Requisitos

- Node.js y npm.
- Expo Go instalado en un teléfono Android o iOS.
- El teléfono y la computadora en la misma red local. Si la conexión falla, se puede usar un túnel.

Conviene usar un teléfono físico, porque los simuladores pueden no tener cámara, magnetómetro ni datos reales de ubicación.

## Instalación

```bash
git clone <url-del-repositorio>
cd explorador-movil
npm install
```

Las dependencias principales son `expo-camera`, `expo-location` y `expo-sensors`. Ya están en el `package.json`, así que `npm install` basta.

## Ejecución

```bash
npx expo start
```

Después escaneo el código QR con Expo Go. Si el teléfono no se conecta, uso:

```bash
npx expo start --tunnel
```

## Módulos

La barra de arriba cambia entre los tres módulos.

- **Cámara:** pide el permiso con `useCameraPermissions`. Si se rechaza, muestra una explicación y un botón para pedirlo otra vez. Con el permiso concedido muestra la vista previa y el botón "Tomar foto", que queda deshabilitado hasta que la cámara esté lista. La foto se muestra debajo con `Image`.
- **Ubicación:** el botón "Obtener mi ubicación" pide el permiso en primer plano y usa `getCurrentPositionAsync`. Muestra latitud y longitud con 6 decimales y la precisión reportada en metros. Mientras espera aparece un indicador de carga, y si se rechaza el permiso o falla la lectura sale un mensaje.
- **Brújula:** se suscribe al magnetómetro dentro de un `useEffect` y quita la suscripción al salir del módulo. Muestra X, Y, Z y el ángulo calculado con `atan2(y, x)`. Si el dispositivo no tiene magnetómetro, muestra "Sensor no disponible".

## Estructura

```
App.js                  barra de navegación y pantalla activa
components/Camara.js    módulo A
components/Ubicacion.js módulo B
components/Brujula.js   módulo C
```

## Limitaciones conocidas

- La foto solo se muestra en pantalla. No se guarda en la galería, y se pierde al cambiar de módulo porque el componente se vuelve a crear.
- El ángulo de la brújula supone que el teléfono está horizontal. No es un rumbo geográfico calibrado, no corrige la declinación magnética ni la inclinación, y puede no coincidir con el norte por interferencia de metales, imanes o aparatos electrónicos cercanos.
- Los valores de X, Y y Z se muestran tal como los entrega el sensor, sin convertir ni indicar unidades.
- La ubicación se consulta solo cuando se pulsa el botón y no se guarda ni se envía a ningún lado. La precisión es la que reporta el sistema y no garantiza un error máximo.
- La navegación es un simple cambio de estado, sin librería de rutas.
