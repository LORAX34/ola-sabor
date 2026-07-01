# 🍸 ElBar — Web de Bar con Gestión

> Guía del proyecto. Versión: 1.0

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | [Astro](https://astro.build) (SSR con `@astrojs/vercel`) |
| UI dinámica | [Vue 3](https://vuejs.org) (Composition API, `<script setup>`) |
| CSS | [Tailwind CSS](https://tailwindcss.com) |
| Animaciones | `@midudev/tailwind-animations` |
| Base de datos | [Supabase](https://supabase.com) (PostgreSQL) |
| Autenticación | Supabase Auth (Email + Password) |
| Imágenes | [Cloudinary](https://cloudinary.com) (WebP automático) |
| Hosting | **Vercel** |
| Lenguaje | TypeScript |

> `@shikijs/engine-oniguruma` ❌ **No se necesita** (era copy-paste de otro proyecto)

---

## Pipeline de Imágenes

```
Admin sube imagen → Cloudinary Upload Preset → WebP + redimensionado + compresión
                                                ↓
                                         URL optimizada
                                                ↓
                                      Se guarda en Supabase
                                                ↓
                                     Se muestra en la web con <picture>/img
```

**Upload Preset de Cloudinary:**
- `format: auto` (elige WebP si el navegador lo soporta)
- `quality: 80`
- `width: 1200`
- `crop: limit`
- `fetch_format: auto`

---

## Modelo de Datos (Supabase)

```sql
-- Categorías (ej: Entrantes, Principales, Postres, Bebidas, Servicios)
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT,
  image_url   TEXT,
  display_order INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Items del menú (platos, bebidas, servicios según su categoría)
CREATE TABLE menu_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id   UUID REFERENCES categories(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  description   TEXT,
  price         DECIMAL(10,2),
  image_url     TEXT,
  is_available  BOOLEAN DEFAULT true,
  is_featured   BOOLEAN DEFAULT false,  -- destacado en home
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Estructura del Proyecto

```
/
├── public/                   # Assets estáticos (favicon, fonts, etc.)
├── src/
│   ├── components/
│   │   └── admin/            # Componentes Vue del panel de gestión
│   │       ├── ImageUploader.vue
│   │       ├── CategoryForm.vue
│   │       ├── CategoryList.vue
│   │       ├── MenuItemForm.vue
│   │       ├── MenuItemList.vue
│   │       └── LoginForm.vue
│   ├── layouts/
│   │   ├── BaseLayout.astro      # Layout público (header, footer, dark toggle)
│   │   └── AdminLayout.astro     # Layout admin (sidebar + verificación auth)
│   ├── pages/
│   │   ├── index.astro           # Home
│   │   ├── menu.astro            # Carta completa
│   │   ├── servicios.astro       # Servicios
│   │   ├── galeria.astro         # Galería de fotos
│   │   ├── contacto.astro        # Contacto
│   │   └── admin/
│   │       ├── login.astro       # Login Supabase Auth
│   │       ├── dashboard.astro   # Dashboard con stats
│   │       ├── categorias.astro  # CRUD categorías
│   │       └── items.astro       # CRUD items
│   ├── lib/
│   │   ├── supabase.ts           # Cliente de Supabase
│   │   └── cloudinary.ts         # Helpers de Cloudinary
│   └── styles/
│       └── globals.css           # Tailwind directives + estilos globales
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Páginas Públicas

| Ruta | Descripción |
|---|---|
| `/` | Hero con foto del local + sección destacados + reseña |
| `/menu` | Carta filtrada por categoría (fetch desde Supabase) |
| `/servicios` | Servicios: eventos privados, reservas, catering, etc. |
| `/galeria` | Grid de fotos desde Cloudinary con lightbox |
| `/contacto` | Dirección, horario, teléfono, Google Maps, formulario |

---

## Panel de Administración

Protegido con Supabase Auth (Email + Password). Redirige a `/admin/login` si no hay sesión.

| Ruta | Funcionalidad |
|---|---|
| `/admin/login` | Formulario login |
| `/admin/dashboard` | Resumen: total items, categorías, items bajos de stock |
| `/admin/categorias` | Listar, crear, editar, reordenar, activar/desactivar categorías |
| `/admin/items` | Listar, crear, editar, eliminar items por categoría + subir imagen |

**Componentes Vue necesarios:**
- `ImageUploader.vue` — drag & drop / click, preview, upload a Cloudinary, devuelve URL
- `CategoryForm.vue` — formulario con validación
- `MenuItemForm.vue` — formulario con selector de categoría y precio
- `LoginForm.vue` — login con Supabase Auth

---

## Diseño / UI

### Modo oscuro
- Toggle con `darkMode: 'class'` en Tailwind
- Persistencia en `localStorage`
- Por defecto: sigue la preferencia del sistema (`prefers-color-scheme`)

### Paleta de colores (propuesta inicial)
```
Modo claro:   fondo white, texto slate-900, acento amber-600
Modo oscuro:  fondo slate-900, texto slate-100, acento amber-400
```

### Tipografía
- Títulos: algo con personalidad (ej: `font-serif` o una display font de Google Fonts)
- Cuerpo: sans-serif limpia (Inter, Plus Jakarta Sans…)

### Animaciones
- `@midudev/tailwind-animations` para entradas suaves al hacer scroll
- Hover en cards del menú
- Transiciones de página sutiles

---

## Fases de Implementación

### Fase 1 — Andamiaje
- [ ] `npm create astro@latest` con Vue + Tailwind
- [ ] Instalar dependencias: `@astrojs/vercel`, `@midudev/tailwind-animations`, `@supabase/supabase-js`
- [ ] Configurar `tailwind.config.mjs` (colores, dark mode, tipografía)
- [ ] Crear layouts `BaseLayout.astro` y `AdminLayout.astro`
- [ ] Configurar `astro.config.mjs` con adapter de Vercel

### Fase 2 — Supabase + Cloudinary
- [ ] Crear proyecto en Supabase + ejecutar schema SQL
- [ ] Crear `src/lib/supabase.ts` con cliente tipado
- [ ] Crear cuenta Cloudinary + upload preset con WebP automático
- [ ] Crear `src/lib/cloudinary.ts` con helpers de subida

### Fase 3 — Páginas públicas
- [ ] Home con hero, sección destacados, reseña
- [ ] Menú dinámico conectado a Supabase
- [ ] Servicios
- [ ] Galería
- [ ] Contacto con mapa

### Fase 4 — Panel Admin
- [ ] Login + protección de rutas (middleware o layout check)
- [ ] CRUD Categorías
- [ ] CRUD Items + ImageUploader → Cloudinary
- [ ] Dashboard básico

### Fase 5 — Polish
- [ ] Modo oscuro con toggle funcional
- [ ] Animaciones con `@midudev/tailwind-animations`
- [ ] Responsive (probar en móvil)
- [ ] SEO (meta tags, Open Graph, sitemap)
- [ ] Lazy loading de imágenes

### Fase 6 — Deploy
- [ ] Desplegar en Vercel
- [ ] Configurar variables de entorno
- [ ] Probar flujo completo: login → crear categoría → crear item con imagen → ver en web

---

## Variables de Entorno

```env
PUBLIC_SUPABASE_URL=          # https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=     # clave anónima de Supabase
CLOUDINARY_CLOUD_NAME=        # nombre del cloud en Cloudinary
CLOUDINARY_UPLOAD_PRESET=     # upload preset para transformación automática
CLOUDINARY_API_KEY=           # solo si se necesita upload firmado
CLOUDINARY_API_SECRET=        # solo si se necesita upload firmado
```

---

## Notas

- Las imágenes se optimizan **en Cloudinary** mediante upload presets. No es necesario procesarlas en cliente, pero se puede añadir compresión previa con `browser-image-compression` si se suben archivos muy pesados (>5MB).
- El modo SSR de Astro con Vercel permite tener rutas estáticas (públicas) y dinámicas (admin) en el mismo proyecto.
- Todo el admin corre con Vue 3. Las páginas públicas pueden ser puro Astro (mejor rendimiento) o tener pequeños islands de Vue si hace falta interactividad.
- La base de datos se puede extender fácilmente: añadir campos a `menu_items` (alérgenos, tiempo de preparación, etc.) sin afectar al frontend.

---

*Documento generado el — Junio 2026*
