# IP Geolocation Service - Product Design Document

A minimalist, high-performance web application providing real-time IP geolocation services. The site displays the visitor's public IP addresses (IPv4 and IPv6) alongside rich geographic and network provider metadata.

## 1. Domain & Routing Strategy
The application dynamically adjusts its information hierarchy based on the entry subdomain to prioritize the relevant protocol.

*   **Global Gateway: [ip.devops-playground.dev](https://ip.devops-playground.dev)**
    *   **Primary Focus:** Dual-stack detection.
    *   **Hierarchy:** IPv4 (Primary) > IPv6 (Secondary).
*   **IPv4 Node: [ipv4.devops-playground.dev](https://ipv4.devops-playground.dev)**
    *   **Primary Focus:** IPv4 validation.
    *   **Hierarchy:** IPv4 (Primary) > IPv6 (Secondary).
*   **IPv6 Node: [ipv6.devops-playground.dev](https://ipv6.devops-playground.dev)**
    *   **Primary Focus:** IPv6 connectivity.
    *   **Hierarchy:** IPv6 (Primary) > IPv4 (Secondary).

## 2. Visual Experience (UI/UX)
The interface is designed to be immersive, leveraging modern web aesthetics to create a premium, "OS-like" feel.

### 2.1 Aesthetic & Theme
*   **Core Theme:** Deep dark mode with high-contrast accents.
*   **Background:** A sophisticated radial gradient. 
    *   `outer`: Deep Navy (`#0a192f`)
    *   `center`: Radiant Crimson-Orange (`#ff4d4d`) with a subtle glow effect.
*   **Glassmorphism:** Interactive elements (like the Geo-card) feature a frosted-glass effect:
    *   `backdrop-filter: blur(12px)`
    *   `background: rgba(255, 255, 255, 0.05)`
    *   `border: 1px solid rgba(255, 255, 255, 0.1)`
*   **Typography:** High-end sans-serif stack utilizing *Inter* or *Outfit* for maximum legibility.

### 2.2 Dynamic Layout
*   **Hero Section:** The IP addresses occupy the visual center.
    *   **Primary IP:** Ultra-bold, large-scale font (`clamp(3rem, 10vw, 6rem)`). Features a subtle entry animation.
    *   **Secondary IP:** Refined, semi-transparent font size (`1.5rem`).
*   **Metadata Grid:** A clean, 2-column or 3-column grid (on desktop) showing:
    *   Location (City, Region, Country)
    *   Network (ISP, ASN)
    *   Technical (Timezone, Coordinates)
*   **Responsiveness:** 
    *   Uses **Container Queries** to adapt the metadata grid.
    *   IP address text uses `text-overflow: ellipsis` or dynamic font-size reduction to ensure zero horizontal scrolling on mobile.

## 3. Functional Architecture
### 3.1 Data Acquisition
*   **IP Detection:**
    *   **Service:** [ipify](https://api.ipify.org?format=json)
    *   **Method:** Client-side fetch with parallel requests for IPv4 and IPv6.
*   **Geolocation:**
    *   **Service:** [ip-api.com](http://ip-api.com/json/)
    *   **Fields:** `status`, `country`, `countryCode`, `regionName`, `city`, `zip`, `lat`, `lon`, `timezone`, `isp`, `as`, `query`.

### 3.2 Reactivity & State
*   **Framework:** Svelte 5.
*   **Runes Usage:**
    *   `$state`: Track IP strings and Geolocation JSON.
    *   `$derived`: Calculate display order based on `window.location.hostname`.
    *   `$effect`: Handle asynchronous API orchestration on mount.

## 4. Technical Specifications
*   **Frontend:** Svelte 5 (Vite-powered).
*   **Styling:** Pure Vanilla CSS (CSS Variables for theme tokens).
*   **SEO & Discovery:**
    *   **Sitemaps:** Independent `sitemap.xml` for each subdomain:
    *   https://ip.devops-playground.dev/sitemap.xml
    *   https://ipv4.devops-playground.dev/sitemap.xml
    *   https://ipv6.devops-playground.dev/sitemap.xml
*   **Metadata:** Rich OpenGraph and Twitter Card tags.
    *   **Structured Data:** `JSON-LD` (WebApplication) to boost AI Agent visibility.
*   **Performance:** 
    *   Zero-dependency footprint (minimalist bundle size).
    *   Aggressive caching for static assets.

## 5. SEO & Metadata Checklist
*   **Title:** My IP Address - Premium IPv4 & IPv6 Geolocation
*   **Description:** Instantly discover your public IP address and granular geolocation data. Fast, open-source, and privacy-focused.
*   **Structured Data:**
    ```json
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "IP Geolocation Service",
      "url": "https://ip.devops-playground.dev",
      "applicationCategory": "UtilitiesApplication"
    }
    ```

## 6. Project Roadmap (README.md)
*   **Tone:** High-level engineering specification.
*   **Sections:**
    *   **Architecture:** Overview of the Svelte 5 + API flow.
    *   **Development:** `npm install`, `npm run dev`.
    *   **Deployment:** Automated CI/CD pipeline details.
    *   **Parity:** Comparison with `curl` based tools like `ifconfig.io`.
