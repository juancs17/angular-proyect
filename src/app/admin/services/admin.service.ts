import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCategory, CreateCategory } from '../interdaces/interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private miUrl = 'https://bolt-backend-chi.vercel.app';

  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private categoryIdSubject = new BehaviorSubject<number | null>(null);
  isOpen$ = this.isOpenSubject.asObservable();
  categoryId$ = this.categoryIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCategories(): Observable<{ resultado: GetCategory[] }> {
    return this.http.get<{ resultado: GetCategory[] }>(
      `${this.miUrl}/api/categories`
    );
  }

  createCategory(product: CreateCategory, token: string): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('image', product.image);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.miUrl}/api/categories`, formData, {
      headers,
    });
  }

  updateCategory(cat: any, id: number, token: string): Observable<any> {
    return this.http.put(`${this.miUrl}/api/categories/${id}`, cat, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCategory(categoryId: number, token: string): Observable<any> {
    console.log('categoryId', categoryId);
    return this.http.delete(`${this.miUrl}/api/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  openModal(categoryId: number) {
    this.isOpenSubject.next(true);
    this.categoryIdSubject.next(categoryId);
  }

  closeModal() {
    this.isOpenSubject.next(false);
    this.categoryIdSubject.next(null);
  }
}
