# IP Geolocation Service - Product Design Document

A minimalist, high-performance web application that provides real-time IP geolocation services, displaying the visitor's IP addresses (IPv4/IPv6) and detailed location data.

## 1. Domain & Routing Logic
The application behaves differently based on the access URL to prioritize specific IP versions.

*   **Primary Site: [ip.devops-playground.dev](https://ip.devops-playground.dev)**
    *   **Primary Display:** IPv4 address.
    *   **Secondary Display:** IPv6 address (if available).
*   **IPv4-Only View: [ipv4.devops-playground.dev](https://ipv4.devops-playground.dev)**
    *   **Primary Display:** IPv4 address.
    *   **Secondary Display:** IPv6 address (if available).
*   **IPv6-Only View: [ipv6.devops-playground.dev](https://ipv6.devops-playground.dev)**
    *   **Primary Display:** IPv6 address.
    *   **Secondary Display:** IPv4 address (if available).

## 2. Visual Design & UI/UX
The design focuses on a premium, modern aesthetic with a "Glassmorphism" feel and dynamic transitions.

### 2.1 Color Palette & Theme
*   **Theme:** Native Dark Mode.
*   **Background:** Deep navy blue gradient (`#0a192f`) transitioning to a vibrant light red-orange (`#ff4d4d`) focal point in the center.
*   **Typography:** Modern sans-serif stack (e.g., *Inter*, *Outfit*, or *System UI*).

### 2.2 Layout & Hierarchy
*   **Central Focus:** The IP addresses are the centerpiece of the page.
    *   **Primary IP:** Large, bold font size (e.g., `4rem` to `6rem`).
    *   **Secondary IP:** Smaller font size (e.g., `1.5rem` to `2rem`), positioned directly beneath the primary IP.
    *   **Geo-Location Data:** Detailed information (City, Region, Country, ISP) displayed below the secondary IP in a clean, tabular, or icon-based layout.
*   **Footer:** Minimalist footer containing a link to the GitHub repository: [yarencheng/ip-static-website](https://github.com/yarencheng/ip-static-website).

### 2.3 Responsiveness
*   **Dynamic Scaling:** IP addresses must scale fluidly to prevent horizontal scrolling.
*   **Font Constraints:** If the IP string width exceeds the viewport width, the font size must automatically decrease to fit the screen.
*   **Stacking:** Maintain vertical hierarchy (Primary > Secondary > Geo) across all device sizes.

## 3. Functional Requirements
*   **IP Detection:** Automatically detect both IPv4 and IPv6 addresses from ipify: https://api.ipify.org?format=json
*   **Geolocation:** Fetch location data based on the detected IP.
    *   *Data Source:* Use ip-api.com.
*   **Primary/Secondary Logic:** Dynamically swap the display order based on the host header (subdomain).

## 4. Technical Stack
*   **Frontend Framework:** Svelte 5 (utilizing runes for reactivity).
*   **Styling:** Vanilla CSS with modern features (CSS Variables, Flexbox/Grid, Container Queries).
*   **Performance:** Static site architecture where possible, with client-side hydration for dynamic IP fetching.

## 5. SEO & Metadata
*   **Target:** Optimize for Google Search and AI Answer Engines (AEO).
*   **Metadata:**
    *   **Title:** My IP Address - Real-time IPv4 & IPv6 Geolocation
    *   **Description:** Instantly check your public IPv4 and IPv6 addresses, location, ISP, and more. Fast, secure, and open-source.
*   **Open Graph:** Include social preview cards for Twitter and Facebook.
*   **Structured Data:** Implement `JSON-LD` for "WebApplication" schema.
*   **Sitemap:** Implement sitemap.xml for SEO.
    *   https://ip.devops-playground.dev/sitemap.xml
    *   https://ipv4.devops-playground.dev/sitemap.xml
    *   https://ipv6.devops-playground.dev/sitemap.xml

## 6. Project Documentation (README.md)
*   **Tone:** Professional engineering tone—clear, concise, and technical.
*   **Content:**
    *   High-level project description and purpose.
    *   Direct links to the production environment.
    *   Comprehensive Local Development guide (installation, environment variables).
    *   Build and Deployment instructions.
