# API Express

API de productos con Express 5 y TypeScript, con todas las pipelines del curso aplicadas: sesiones 05 a 07.

## En local

```bash
npm install
npm run dev              # http://localhost:3000/api/health
npm run typecheck        # comprobar tipos
npm test                 # tests con Jest y supertest
npm test -- --coverage   # con cobertura
npm run build && npm start
```

## Rutas

| Método | Ruta | Respuesta |
| --- | --- | --- |
| GET | `/api/health` | `{ "status": "ok", "version": "..." }` |
| GET | `/api/products` | Lista de productos |
| GET | `/api/products/:id` | Un producto o 404 |
| POST | `/api/products` | 201 con el producto creado o 400 |

## Variables de entorno

| Variable | Para qué | Por defecto |
| --- | --- | --- |
| `PORT` | Puerto en el que escucha | `3000` |
| `CORS_ORIGIN` | Origen al que se permite llamar a la API | `http://127.0.0.1:5500` |
| `APP_VERSION` | Versión que muestra `/api/health` (la pone el `Dockerfile`) | `dev` |

## Notas

- Jest usa `@swc/jest` para entender TypeScript: `ts-jest` no funciona con TypeScript 7.
- `tsconfig.json` necesita `rootDir` para que `tsc` compile en TypeScript 7.
