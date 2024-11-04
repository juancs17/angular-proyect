
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCategory, CreateProduct } from '../interdaces/interface'; 
// import { InterUser, InterUserEdit, InferUserCreate } from '../interdaces/interface';
// import { InterUserDetail } from '../interdaces/interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
  export class AdminService {
    private miUrl = 'https://bolt-backend-chi.vercel.app'; 
  
    constructor(private http: HttpClient) {}
  
    getCategories(): Observable<{ resultado: GetCategory[] }> {
      return this.http.get<{ resultado: GetCategory[] }>(
        `${this.miUrl}/api/categories`
      );
    }

    createProduct(product: CreateProduct, token: string): Observable<any> {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('image', product.image);
      
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.post( `${this.miUrl}/api/categories`, formData, { headers });
    }
    
  
    // getUserById(id: string): Observable<InterUserDetail> {
    //   return this.http.get<InterUserDetail>(
    //     `${this.apiUrl}/get_user_by_id/${id}`
    //   );
    // }
    // updateUser(user: InterUserEdit, id: number): Observable<any> {
    //   return this.http.put(`${this.apiUrl}/update_user/${id}`, user);
    // }
  
    // deleteUser(userId: number): Observable<any> {
    //   return this.http.delete(`${this.apiUrl}/delete_user/${userId}`);
    // }
    // createUser(dataFrom: InferUserCreate): Observable<any> {
    //   return this.http.get(`${this.miUrl}/api/auth/login`, dataFrom);
    // }


    private isOpen = new BehaviorSubject<boolean>(false);
    isOpen$ = this.isOpen.asObservable();
  
    openModal() {
      this.isOpen.next(true);
    }
  
    closeModal() {
      this.isOpen.next(false);
    }
  }