# CV Digital - Nieves Gómez Carrasco

Portfolio/CV digital interactivo desarrollado con React, Vite, GSAP y Sass. Este proyecto muestra tu experiencia profesional, habilidades técnicas y formación académica de manera moderna y atractiva.

## 🚀 Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite** - Build tool rápido y moderno
- **GSAP (GreenSock Animation Platform)** - Animaciones fluidas y profesionales
- **Sass** - Preprocesador CSS para estilos organizados y reutilizables

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## 🛠️ Instalación y Configuración

### 1. Instalar Dependencias
```powershell
npm install
```

### 2. Ejecutar en Modo Desarrollo
```powershell
npm run dev
```
El sitio estará disponible en `http://localhost:5173`

### 3. Compilar para Producción
```powershell
npm run build
```
Los archivos compilados estarán en la carpeta `dist/`

### 4. Vista Previa de Producción
```powershell
npm run preview
```

## 📁 Estructura del Proyecto

```
cv-digital-nieves/
├── src/
│   ├── assets/images/       # Iconos de tecnologías y logos
│   ├── components/          # Componentes React
│   │   ├── Header.jsx       # Navegación superior
│   │   ├── Hero.jsx         # Sección principal/portada
│   │   ├── Experience.jsx   # Experiencia profesional
│   │   ├── Skills.jsx       # Habilidades técnicas
│   │   ├── Education.jsx    # Formación académica
│   │   └── Contact.jsx      # Información de contacto
│   ├── styles/              # Estilos globales
│   │   ├── _variables.scss  # Variables de colores, tamaños, etc.
│   │   ├── _mixins.scss     # Mixins reutilizables
│   │   └── App.scss         # Estilos globales
│   └── App.jsx              # Componente principal
```

## ✏️ Guía de Personalización

### 🎨 Cambiar Colores
Edita `src/styles/_variables.scss`:
```scss
$color-primary: #FDB913;      // Amarillo/Dorado
$color-secondary: #2C3E50;    // Azul oscuro
$color-accent: #E67E22;       // Naranja
```

### 📝 Modificar Contenido de Experiencia
Archivo: `src/components/Experience.jsx`
```jsx
const experiences = [
  {
    title: 'Título del Puesto',
    company: 'Nombre Empresa',
    period: '2023 – Presente',
    location: 'Ciudad',
    icon: '💼',
    achievements: [
      'Logro 1',
      'Logro 2'
    ]
  }
];
```

### 🎯 Modificar Habilidades
Archivo: `src/components/Skills.jsx`
```jsx
const skillsData = {
  frontend: [
    { name: 'HTML5', icon: htmlIcon, level: 90 }
  ]
};
```

### 🎓 Modificar Formación
Archivo: `src/components/Education.jsx`
```jsx
const education = [
  {
    title: 'Nombre del Curso',
    institution: 'Institución',
    period: '2023',
    icon: logoIcon
  }
];
```

### ➕ Añadir Nueva Sección

1. Crea el componente: `src/components/MiSeccion.jsx`
```jsx
import './MiSeccion.scss';

const MiSeccion = () => {
  return (
    <section className="mi-seccion section" id="mi-seccion">
      <div className="container">
        <h2 className="section-title">Mi Sección</h2>
        {/* Tu contenido */}
      </div>
    </section>
  );
};
export default MiSeccion;
```

2. Crea los estilos: `src/components/MiSeccion.scss`
```scss
@import '../styles/variables';
@import '../styles/mixins';

.mi-seccion {
  // Tus estilos
}
```

3. Añade en `src/App.jsx`:
```jsx
import MiSeccion from './components/MiSeccion';

// En el return:
<MiSeccion />
```

4. Añade al menú en `src/components/Header.jsx`:
```jsx
{ href: '#mi-seccion', label: 'Mi Sección' }
```

### ❌ Eliminar una Sección

1. Elimina la importación y el componente de `App.jsx`
2. Elimina el link del menú en `Header.jsx`
3. Elimina los archivos del componente (opcional)

### 🖼️ Cambiar Imágenes

1. Coloca la imagen en `src/assets/images/`
2. Importa en el componente:
```jsx
import miImagen from '../assets/images/mi-imagen.webp';
```
3. Úsala:
```jsx
<img src={miImagen} alt="Descripción" />
```

### 🎬 Modificar Animaciones GSAP

En cualquier componente:
```jsx
useEffect(() => {
  gsap.from('.elemento', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });
}, []);
```

### 📱 Responsive Design

Usa los mixins en tus estilos:
```scss
.mi-elemento {
  font-size: 2rem;
  
  @include respond-to('tablet') {
    font-size: 1.5rem;
  }
  
  @include respond-to('mobile') {
    font-size: 1rem;
  }
}
```

### 🔗 Actualizar Enlaces

En `Hero.jsx` y `Contact.jsx`:
```jsx
<a href="https://github.com/tu-usuario">GitHub</a>
<a href="https://linkedin.com/in/tu-perfil">LinkedIn</a>
```

## 🚀 Despliegue

### Vercel (Recomendado)
```powershell
npm i -g vercel
vercel
```

### Netlify
1. `npm run build`
2. Arrastra carpeta `dist` a netlify.com/drop

### GitHub Pages
```powershell
npm install --save-dev gh-pages
```
Añade a `package.json`:
```json
{
  "homepage": "https://tu-usuario.github.io/cv-digital",
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```
Ejecuta: `npm run deploy`

## 🐛 Solución de Problemas

**Imágenes no cargan**: Verifica rutas y extensiones
**Estilos no aplican**: Importa variables y mixins en cada .scss
**Animaciones no funcionan**: Registra plugins de GSAP

## 📄 Licencia

Proyecto de uso personal. Todos los derechos reservados.

---

**Desarrollado con ❤️ usando React, Vite, GSAP y Sass**
