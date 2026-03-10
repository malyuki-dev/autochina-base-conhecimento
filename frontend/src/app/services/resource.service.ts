import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private readonly API_URL = 'http://localhost:3000/resources';
  private readonly GEMINI_URL = 'http://localhost:3000/gemini';

  constructor(private http: HttpClient) { }

  getResources(): Observable<any> {
    const ob = this.http.get<any[]>(this.API_URL);
    ob.subscribe({
      next: (val) => console.log('Raw API Response from /resources:', val),
      error: (err) => console.error('API /resources error:', err)
    });
    return ob as any;
  }

  getResourceById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`) as any;
  }

  syncGeminiVideos(): Observable<any> {
    return this.http.post<any>(`${this.GEMINI_URL}/sync`, {}) as any;
  }

  askGemini(resourceId: number, question: string): Observable<any> {
    return this.http.post<any>(`${this.GEMINI_URL}/chat`, { resourceId, question }) as any;
  }
}