# SIGUI — Personal Website & Knowledge Base

> Personal website, engineering notes, technical documentation, and developer resources by **Sigui Kessé Emmanuel**.

[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01?logo=astro\&logoColor=white)](https://astro.build/)
[![Runtime](https://img.shields.io/badge/Runtime-Deno-000000?logo=deno\&logoColor=white)](https://deno.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-AGPL--3.0-BC1E2D)](LICENSE)

This repository contains the source code for my personal website and technical knowledge base.

It is where I publish information about my work, document engineering ideas, maintain technical references, and share resources around software development and open source.

**Website:** [siguici.sikessem.com](https://siguici.sikessem.com)

---

## ✦ About

This project is more than a personal landing page.

It is designed as a long-lived personal digital space combining:

- **Personal profile** — background, experience, skills, and professional identity.
- **Portfolio** — selected projects, experiments, and work.
- **Engineering notes** — technical writing, architecture decisions, experiments, and lessons learned.
- **Documentation** — structured documentation for projects, libraries, and developer tooling.
- **References** — reusable technical knowledge and resources.
- **Open-source projects** — documentation and entry points for projects maintained or developed by me.

The site is intentionally built as a content-oriented platform rather than a static portfolio template.

---

## 🏗️ Technology

The website is built around a small, modern, and intentionally minimal stack.

| Layer                | Technology                                        |
| -------------------- | ------------------------------------------------- |
| Framework            | [Astro](https://astro.build/) 7                   |
| Runtime              | [Deno](https://deno.com/) 2.9                     |
| Documentation        | [Astro Starlight](https://starlight.astro.build/) |
| Styling              | [Tailwind CSS](https://tailwindcss.com/) 4        |
| Build integration    | `@tailwindcss/vite`                               |
| Language             | TypeScript                                        |
| Formatting & linting | [Biome](https://biomejs.dev/)                     |
| Content              | Astro content / Markdown                          |
| Images               | Sharp / Astro image tooling                       |
| Deployment           | Deno Deploy                                       |
| License              | AGPL-3.0-or-later                                 |

Astro is responsible for the application and content layer, while Deno is the primary development and execution environment.

The project uses Astro's Vite integration for Tailwind CSS and Starlight for the documentation experience.

---

## 📁 Project Structure

The repository is organized around the website itself and its supporting tooling:

```text
.
├── .github/
│   └── workflows/       # CI/CD workflows
├── public/              # Static assets
├── scripts/             # Project-specific automation
├── src/                 # Application and content source
├── .env.example         # Environment variable reference
├── astro.config.ts      # Astro configuration
├── biome.json           # Biome configuration
├── deno.json            # Deno configuration and tasks
├── deno.lock            # Deno dependency lockfile
├── package.json         # Node/npm ecosystem metadata
├── tsconfig.json        # TypeScript configuration
├── CHANGELOG.md         # Project changelog
└── LICENSE              # Project license
```

The repository also contains a small `run` helper used by several project tasks.

---

## 🚀 Getting Started

### Prerequisites

You should have:

- [Deno](https://deno.com/) **2.9.x**
- Git

Node.js is not required as the primary runtime. Deno manages the project's JavaScript/TypeScript dependencies and executes the development tooling.

### Clone the repository

```bash
git clone https://github.com/siguici/siguici.github.io.git
cd siguici.github.io
```

### Start the development server

```bash
deno task dev
```

Astro will start the local development server with hot module replacement.

### Build for production

```bash
deno task build
```

### Preview the production build

```bash
deno task preview
```

---

## 🧰 Development Tasks

The project's development workflow is defined in `deno.json`.

### Development

```bash
deno task dev
```

Start Astro in development mode.

### Build

```bash
deno task build
```

Create a production build.

### Preview

```bash
deno task preview
```

Serve the generated production build locally.

### Type checking & quality checks

```bash
deno task check
```

The complete check pipeline includes:

- Astro type/content checking
- Biome CI checks
- Deno formatting verification
- Deno type checking
- Deno linting
- internationalization validation

### Automatic fixes

```bash
deno task fix
```

Run the project's formatting, linting, and synchronization fixes.

### Synchronize Astro

```bash
deno task sync
```

Run Astro's synchronization step.

### Internationalization checks

```bash
deno task i18n:check
```

Validate the site's localized content.

### Production verification

```bash
deno task prod
```

Run the validation pipeline and then create a production build.

### Serve the generated application

```bash
deno task serve
```

Serve the generated server entry point directly.

### Upgrade Astro

```bash
deno task upgrade
```

Run Astro's upgrade utility.

---

## 🌍 Internationalization

The website supports multiple locales, with English as the default language and French as an additional locale.

Current locales:

```text
en → en-US
fr → fr-CI
```

The sitemap configuration also reflects these locales and generates the corresponding multilingual metadata.

Internationalized content should therefore be kept structurally consistent between supported locales.

The project includes a dedicated validation script:

```bash
deno task i18n:check
```

---

## 📚 Documentation

The documentation section is powered by **Astro Starlight**.

It provides:

- structured technical documentation;
- project references;
- getting-started guides;
- open-source project documentation;
- automatically generated reference sections;
- documentation navigation;
- edit links back to GitHub.

The current documentation structure includes:

```text
Open-source projects
Getting started
└── Quickstart
Reference
└── ...
```

Starlight is integrated directly into the Astro application rather than being maintained as a separate documentation site.

---

## 🎨 Styling

The project uses **Tailwind CSS v4** through its Vite integration.

Tailwind is therefore part of Astro's build pipeline rather than being treated as an independent CSS build step.

The integration is configured in `astro.config.ts`:

```ts
vite: {
  plugins: [tailwindcss()],
}
```

This keeps the styling pipeline close to Astro's native build system.

---

## 🧪 Quality & Engineering Standards

The project aims to keep the codebase small, predictable, and continuously verifiable.

The main quality command is:

```bash
deno task check
```

It combines several independent checks:

```text
Astro
  └─ type and project validation

Biome
  └─ formatting and static analysis

Deno
  ├─ formatting
  ├─ type checking
  └─ linting

i18n
  └─ localized-content consistency
```

The repository uses strict TypeScript compiler settings and Deno's recommended linting rules.

---

## 🔄 Production Workflow

The intended workflow is deliberately simple:

```text
Edit
  ↓
deno task dev
  ↓
deno task check
  ↓
deno task build
  ↓
Deploy
```

For a production-oriented local verification:

```bash
deno task prod
```

The repository also contains CI/CD workflows under `.github/workflows/`.

---

## ☁️ Deployment

The project is configured to deploy to **Deno Deploy**.

The repository currently defines a production deployment task:

```bash
deno task deploy
```

Deployment configuration is kept outside the application code wherever possible, while the application itself remains compatible with Astro's server output.

---

## 🧭 Architecture Principles

This project intentionally follows a few principles.

### Content first

The website is treated as a long-lived knowledge base rather than a disposable portfolio.

Content should remain understandable and maintainable independently of the presentation layer.

### Minimal runtime complexity

The stack intentionally avoids unnecessary infrastructure.

Astro handles the application and content layer, while Deno provides the runtime and development tooling.

### Documentation as a first-class surface

Documentation is not an afterthought.

The same project can expose personal content, engineering notes, references, and structured project documentation.

### Progressive complexity

The site should remain simple until complexity is actually justified.

New infrastructure, dependencies, abstractions, or services should solve a concrete problem rather than anticipate hypothetical requirements.

---

## 🤝 Contributing

This is primarily a personal website, so contributions are not managed like those of a conventional open-source product.

However, useful corrections and improvements are welcome.

Examples include:

- fixing factual or typographical errors;
- improving documentation;
- correcting broken links;
- improving accessibility;
- fixing reproducible technical issues;
- suggesting improvements to the site's infrastructure.

Before submitting a change, please run:

```bash
deno task check
```

For larger changes, open an issue first so the proposed direction can be discussed.

---

## 🔐 Security

If you discover a security vulnerability, please avoid opening a public issue with sensitive details.

Use the repository's security reporting mechanism instead.

See the repository's [Security Policy](SECURITY.md) for the appropriate procedure.

---

## 📜 License

This project is licensed under the **GNU Affero General Public License v3.0 or later**.

See [`LICENSE`](LICENSE) for the complete license text.

---

## 👤 Author

**Sigui Kessé Emmanuel**

Software Engineer · Developer Tooling · Open Source Maintainer · Platform Engineer · Software Architect

- Website — [siguici.sikessem.com](https://siguici.sikessem.com)
- GitHub — [@siguici](https://github.com/siguici)
- X — [@siguici](https://x.com/siguici)
- Discord — [Sikessem Community](https://discord.gg/PURzNH7KBj)
- YouTube — [@siguici](https://youtube.com/@siguici)

---

## 🪐 Philosophy

> Build systems that remain useful after the initial excitement of building them.

This repository is part of that approach: a personal space for building, documenting, experimenting, and sharing.

The website will evolve as my work, projects, and technical interests evolve.
