# IP Geolocation Service

A minimalist, high-performance web application providing real-time IP geolocation services. Built with Svelte 5 and optimized for speed, accuracy, and accessibility.

## Architecture

This project leverages a modern stack designed for zero-latency detection and responsive design:

- **Framework**: [Svelte 5](https://svelte.dev) utilizing the latest Runes (`$state`, `$derived`, `$effect`) for fine-grained reactivity.
- **Build Tool**: [Vite](https://vitejs.dev) for ultra-fast development and optimized production bundles.
- **Data Pipeline**:
  - Dual-stack detection via `ipify` (IPv4 & IPv6).
  - Geolocation metadata powered by high-accuracy HTTPS-compliant APIs.
- **Styling**: Pure Vanilla CSS with a focus on Glassmorphism and Container Queries for responsive metadata grids.

## Features

- **Protocol Priority**: Automatically detects and prioritizes the relevant IP version based on the entry subdomain (ip, ipv4, ipv6).
- **Glassmorphism UI**: A premium, "OS-like" interface with backdrop blurs and radial glow effects.
- **SEO Optimized**: Pre-configured with OpenGraph, Twitter Cards, and JSON-LD structured data.
- **Performance**: Zero-dependency footprint (excluding framework core) ensures minimal payload and fast Time to Interactive (TTI).

## Development

To get started with local development:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Run unit tests with coverage
npm run test
```

## Deployment

The application is designed to be deployed as a static site. 

- **Primary URL**: [ip.devops-playground.dev](https://ip.devops-playground.dev)
- **CI/CD**: Automatic builds via GitHub Actions (or similar) triggering on push to `main`.

## Parity

This tool is designed to be a visual alternative to CLI-based tools like `curl ifconfig.io`. While it provides a rich GUI, it maintains the same accuracy and speed expected by engineers.

---

Built with ❤️ for the DevOps community.
