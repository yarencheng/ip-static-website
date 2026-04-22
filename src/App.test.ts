import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App.svelte';

describe('App Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders detecting state initially', () => {
    (fetch as any).mockReturnValue(new Promise(() => {})); // Return a pending promise
    render(App);
    expect(screen.getByText(/Detecting.../i)).toBeInTheDocument();
  });

  it('fetches and displays IP and geolocation data', async () => {
    (fetch as any).mockImplementation((url: string) => {
      if (url.includes('api.ipify.org')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ ip: '1.2.3.4' }) });
      }
      if (url.includes('api6.ipify.org')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ ip: '2001:db8::1' }) });
      }
      if (url.includes('free.freeipapi.com')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            cityName: 'San Francisco',
            regionName: 'California',
            countryName: 'United States',
            asnOrganization: 'Mock ISP',
            timeZones: ['America/Los_Angeles'],
            latitude: 37.7749,
            longitude: -122.4194,
            zipCode: '94105',
            asn: 12345
          })
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(App);

    await waitFor(() => {
      expect(screen.getByText('1.2.3.4')).toBeInTheDocument();
      expect(screen.getByText(/IPv6: 2001:db8::1/i)).toBeInTheDocument();
      expect(screen.getByText(/San Francisco, California, United States/i)).toBeInTheDocument();
      expect(screen.getByText(/Mock ISP/i)).toBeInTheDocument();
    });
  });

  it('handles fetch errors gracefully', async () => {
    (fetch as any).mockRejectedValue(new Error('Network error'));

    render(App);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load network data/i)).toBeInTheDocument();
    });
  });
});
