import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';
import { CreateProductComponent } from './admin/pages/create-product/create-product.component';
import { PutProductComponent } from './admin/pages/put-product/put-product.component';
import { GetProductComponent } from './admin/pages/get-product/get-product.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'categorias',
        children: [
          {
            path: 'crear',
            component: CreateProductComponent,
          },
          {
            path: 'editar/:id',
            component: PutProductComponent,
          },
          {
            path: 'productos',
            component: GetProductComponent,
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
