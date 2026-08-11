# Ozarp — Conta Global

Site institucional e landing page da **Ozarp**, uma instituição de pagamento (conta global) da nova geração — seu dinheiro sem fronteiras.

## ✨ Funcionalidades

- **Arquitetura Next.js 14 Moderna**: Roteamento App Router com Server/Client Components
- **Tema Claro/Escuro**: Alternância entre temas com persistência em `localStorage` e sem flash no carregamento
- **Logotipo Tema-Consciente**: Logo alterna automaticamente entre `logo.png` (light) e `logo-dark.png` (dark) em header, seção de contato e rodapé
- **Animações Avançadas**: Personagens e seções animados com GSAP, React Spring e Framer Motion
- **Scroll Suave**: Experiência de rolagem aprimorada com Lenis + GSAP ScrollTrigger
- **Efeito Gradual Blur**: Desfoque progressivo na base da viewport (desativado automaticamente sob o rodapé)
- **3D com Three.js**: Componentes 3D interativos via React Three Fiber, Drei e Spline
- **Scroll Horizontal**: Seção com animação de texto em rolagem horizontal pinada
- **Design Responsivo**: Totalmente responsivo do mobile ao ultra-wide
- **Seções Principais**:
  - **Hero** com vídeo de fundo, badges e CTAs da App Store / Google Play
  - **Benefícios** (#about) com faixa Skiggle animada e cards 2/3 + 1/3
  - **Investimentos** (#projects-section) com painel de features e gradiente em malha
  - **App** (#app-section) com showcase do app, features e estatísticas
  - **Cartão** (#card-section) com painel azul interativo e 4 tiles de features
  - **Scroll Horizontal** com tipografia gigante
  - **Contato** (#contact-section) com logo grande, download do app e CTAs das lojas
  - **Rodapé** com navegação, redes sociais e links de suporte/legal

## 🛠️ Tech Stack

| Categoria             | Tecnologias                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Framework**         | Next.js 14.2 (App Router) + React 18                                                                                        |
| **3D / WebGL**        | Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing, @react-three/rapier, @splinetool/react-spline |
| **Animação**          | GSAP (ScrollTrigger), Framer Motion, @react-spring/web, Lenis (smooth scroll), Parallax.js                                  |
| **Estilização**       | Tailwind CSS, CSS Custom Properties (tokens de tema), PostCSS, Autoprefixer                                                 |
| **UI & Ícones**       | Lucide React, CountUp.js                                                                                                    |
| **Shaders / Efeitos** | lamina, lil-gui, webpack-glsl-loader, tailwindcss-3d                                                                        |
| **Utilitários**       | mathjs, nice-color-palettes, @mediapipe/tasks-vision, react-intersection-observer                                           |
| **Fontes**            | Poppins (body), Epilogue (display), Aeonik (custom - nav/UI)                                                                |

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/tefooh/elfekky-portfolio.git
cd elfekky-portfolio
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🚀 Build para Produção

```bash
npm run build
npm start
```

Para verificar linting do código:

```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
elfekky-portfolio/
├── app/
│   ├── globals.css         # Tokens de tema, estilos globais e seções
│   ├── layout.js           # Root layout (fontes Poppins + Epilogue, script anti-flash tema)
│   └── page.js             # Página principal — compõe todas as seções
├── components/
│   ├── About/
│   │   └── Particles/      # Efeito de partículas
│   ├── AppScreen/          # Telas do app
│   ├── AppShowcase/        # Seção #app-section
│   ├── CardShowcase/       # Seção #card-section (cartão azul)
│   ├── Character/
│   │   ├── Character.jsx   # Componente 3D
│   │   └── Experience.jsx
│   ├── Contact/            # Seção #contact-section (logo + CTA)
│   ├── Featured/
│   │   ├── AboutUs.jsx
│   │   ├── FeaturedVideo.jsx
│   │   ├── Header.jsx      # Header da seção benefícios
│   │   ├── Skiggle.jsx     # Faixa SVG animada do #about
│   │   ├── SubHeader.jsx
│   │   └── TrailText.jsx
│   ├── FeaturedWork/
│   ├── GradualBlur/        # Efeito blur progressivo fixo
│   ├── HeroSection/        # Hero principal com vídeo
│   ├── HorizontalScroll/   # Scroll horizontal com tipografia
│   ├── LiquidEther/        # Shader / efeito visual
│   ├── Loaders/            # Loader de contagem % inicial
│   ├── Logo/               # Componente Logo reutilizável (tema-aware)
│   ├── Navbar/
│   │   ├── Description.jsx
│   │   ├── LetsTalk.jsx
│   │   ├── Menu.jsx
│   │   ├── MenuButton.jsx  # Botão do menu dropdown
│   │   ├── MusicButton.jsx # ThemeButton (light/dark toggle)
│   │   ├── Navbar.jsx      # Header flutuante com navegação
│   │   ├── ScrollText.jsx
│   │   └── TrailText.jsx
│   ├── Phone3D/            # Render 3D do celular
│   ├── Projects/           # Seção #projects-section (investimentos)
│   ├── SiteFooter/         # Rodapé principal
│   ├── utils/
│   │   ├── useTheme.js     # Hook: lê data-theme e observa mudanças via MutationObserver
│   │   └── utils.js
│   ├── navigation.js       # NAV_ITEMS, FOOTER_NAV_ITEMS, scrollToSection
│   └── SmoothScroll.jsx    # Provedor Lenis (smooth scrolling)
├── public/
│   ├── fonts/              # Epilogue-Variable, Aeonik (Regular/Bold/Medium)
│   ├── card/               # Assets do cartão (spread-baixo, cartao-global, etc.)
│   ├── logo.png            # Logo modo claro
│   ├── logo-dark.png       # Logo modo escuro
│   ├── icon.png            # Favicon
│   ├── banner.png / app-mockup.png / cartao.png / Svg_Stroke.png
│   ├── Vector 1.svg / arrow-right.svg
│   └── d7e3f658-ad2c-4625-a3eb-165e8d54403c.jpg
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Componentes Principais

| Componente           | Pasta                                                                                                                                            | Descrição                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Navbar**           | [Navbar/Navbar.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/Navbar/Navbar.jsx)                                         | Header flutuante (pill) com scroll state, menu mobile, botão de tema |
| **HeroSection**      | [HeroSection/HeroSection.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/HeroSection/HeroSection.jsx)                     | Landing hero com vídeo, CTAs e gradiente scrim                       |
| **Skiggle**          | [Featured/Skiggle.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/Featured/Skiggle.jsx)                                   | Faixa SVG animada (SVG stroke draw) atrás da seção #about            |
| **Projects**         | [Projects/Projects.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/Projects/Projects.jsx)                                 | Painel de investimentos com gradiente em malha pastel                |
| **AppShowcase**      | [AppShowcase/AppShowcase.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/AppShowcase/AppShowcase.jsx)                     | Seção do app com features e estatísticas                             |
| **CardShowcase**     | [CardShowcase/CardShowcase.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/CardShowcase/CardShowcase.jsx)                 | Painel azul do cartão com 4 feature tiles                            |
| **HorizontalScroll** | [HorizontalScroll/HorizontalScroll.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/HorizontalScroll/HorizontalScroll.jsx) | Tipografia gigante em scroll horizontal (GSAP pinned)                |
| **Contact**          | [Contact/Contact.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/Contact/Contact.jsx)                                     | Logo grande + CTAs App Store / Google Play                           |
| **SiteFooter**       | [SiteFooter/SiteFooter.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/SiteFooter/SiteFooter.jsx)                         | Rodapé com navegação, redes sociais e links legais                   |
| **Logo**             | [Logo/Logo.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/Logo/Logo.jsx)                                                 | Logo reutilizável que troca para `logo-dark.png` no tema escuro      |
| **GradualBlur**      | [GradualBlur/GradualBlur.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/GradualBlur/GradualBlur.jsx)                     | Overlay de blur progressivo na base da viewport                      |
| **LiquidEther**      | [LiquidEther/LiquidEther.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/LiquidEther/LiquidEther.jsx)                     | Shader / efeito de fundo animado                                     |

## 🎨 Sistema de Tema

O tema claro/escuro é controlado pelo atributo `data-theme` no `<html>`:

1. **Bootstrap sem flash** — Em `app/layout.js`, um script inline roda _antes_ da pintura do body, lê `localStorage.getItem('theme')` e aplica `data-theme="dark"` ou `"light"` imediatamente.
2. **Alternância** — O botão em [MusicButton.jsx](file:///c:/Users/User/Downloads/elfekky-portfolio-main/components/Navbar/MusicButton.jsx) chama `document.documentElement.dataset.theme = next` e salva em `localStorage`.
3. **Logo reativo** — O componente `Logo` usa o hook `useTheme`, que observa mudanças no atributo via `MutationObserver` e troca `/logo.png` ↔ `/logo-dark.png` em tempo real em _todos_ os pontos de uso (Navbar, Contact, SiteFooter).
4. **Tokens CSS** — Todas as cores são variáveis CSS (`--color-bg`, `--color-accent`, `--color-brand-orange`, etc.) com override em `[data-theme="dark"]`.
#   o z a r p  
 