import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private cacheName = 'my-app-cache-v1';

  async addToCache(key: string, value: any): Promise<void> {
    const cache = await caches.open(this.cacheName);
    const response = new Response(JSON.stringify(value));
    await cache.put(key, response.clone());
  }

  async getFromCache(key: string): Promise<any> {
    const cache = await caches.open(this.cacheName);
    const cachedResponse = await cache.match(key);
    if (cachedResponse) {
      return cachedResponse.json();
    }
    return null;
  }
}
