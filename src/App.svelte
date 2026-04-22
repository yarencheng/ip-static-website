<script lang="ts">
  import { onMount } from 'svelte';
  import './app.css';

  // --- State ---
  let ipv4 = $state<string | null>(null);
  let ipv6 = $state<string | null>(null);
  let geo = $state<any>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);

  // --- Derived ---
  const hostname = $derived(typeof window !== 'undefined' ? window.location.hostname : '');
  
  const isIpv6Domain = $derived(hostname.startsWith('ipv6.'));
  const isIpv4Domain = $derived(hostname.startsWith('ipv4.'));

  const displayPrimary = $derived(
    isIpv6Domain 
      ? (ipv6 || ipv4 || 'Detecting...') 
      : (ipv4 || ipv6 || 'Detecting...')
  );

  const displaySecondary = $derived(
    isIpv6Domain 
      ? (ipv4 ? `IPv4: ${ipv4}` : '') 
      : (ipv6 ? `IPv6: ${ipv6}` : '')
  );

  // --- Actions ---
  async function fetchIps() {
    try {
      loading = true;
      error = null;

      // Parallel fetch for IPv4 and IPv6
      const [v4Res, v6Res] = await Promise.allSettled([
        fetch('https://api.ipify.org?format=json').then(r => r.ok ? r.json() : Promise.reject('v4 failed')),
        fetch('https://api6.ipify.org?format=json').then(r => r.ok ? r.json() : Promise.reject('v6 failed'))
      ]);

      if (v4Res.status === 'fulfilled' && v4Res.value?.ip) ipv4 = v4Res.value.ip;
      if (v6Res.status === 'fulfilled' && v6Res.value?.ip) ipv6 = v6Res.value.ip;

      // Geolocation (using free.freeipapi.com as it's the stable endpoint)
      try {
        const geoRes = await fetch('https://free.freeipapi.com/api/json');
        if (geoRes.ok) {
          geo = await geoRes.json();
        }
      } catch (geoErr) {
        console.error('Failed to fetch geolocation:', geoErr);
      }

      if (!ipv4 && !ipv6) {
        error = 'Failed to load network data. Please check your connection.';
      }
    } catch (err) {
      console.error('Failed to fetch IP data:', err);
      error = 'Failed to load network data. Please check your connection.';
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    fetchIps();
  });
</script>

<main>
  <div class="glow"></div>
  
  <header class="hero-title">
    <h1 class="primary-ip" id="primary-ip">
      {displayPrimary}
    </h1>
    {#if displaySecondary}
      <p class="secondary-ip" id="secondary-ip">
        {displaySecondary}
      </p>
    {/if}
  </header>

  <div class="metadata-container">
    <section class="glass-card">
      {#if loading}
        <div class="loading">
          <div class="spinner"></div>
          Analyzing network environment...
        </div>
      {:else if error}
        <div class="error">{error}</div>
      {:else if geo}
        <div class="metadata-grid">
          <div class="metadata-item">
            <span class="metadata-label">Location</span>
            <span class="metadata-value">
              {[geo.cityName, geo.regionName, geo.countryName].filter(Boolean).join(', ')}
            </span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Network / ISP</span>
            <span class="metadata-value">{geo.asnOrganization || geo.asName || 'Unknown ISP'}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Timezone</span>
            <span class="metadata-value">
              {geo.timeZone || (geo.timeZones && geo.timeZones[0]) || 'N/A'}
            </span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Coordinates</span>
            <span class="metadata-value">{geo.latitude}, {geo.longitude}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Zip Code</span>
            <span class="metadata-value">{geo.zipCode || 'N/A'}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">ASN</span>
            <span class="metadata-value">AS{geo.asn || 'N/A'}</span>
          </div>
        </div>
      {:else}
        <div class="error">Geolocation data currently unavailable.</div>
      {/if}
    </section>
  </div>

  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-links">
        <a href="https://github.com/yarencheng/ip-static-website" target="_blank" rel="noopener">
          github.com/yarencheng/ip-static-website
        </a>
      </div>
    </div>
  </footer>
</main>

<style>
  .loading, .error {
    text-align: center;
    padding: 3rem;
    font-size: 1.1rem;
    color: var(--text-secondary);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top-color: var(--accent);
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .error {
    color: var(--bg-center);
  }

  .app-footer {
    margin-top: 4rem;
    padding: 2rem;
    width: 100%;
    color: var(--text-secondary);
    font-size: 0.9rem;
    text-align: center;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .footer-links a {
    color: var(--text-primary);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .footer-links a:hover {
    border-bottom-color: var(--accent);
  }


</style>
