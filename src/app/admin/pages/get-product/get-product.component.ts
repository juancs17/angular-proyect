import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { GetCategory } from '../../interdaces/interface';
import { DeleteProductComponent } from '../delete-product/delete-product.component';

@Component({
  selector: 'app-get-product',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    NgFor,
    DeleteProductComponent,
  ],
  templateUrl: './get-product.component.html',
  styleUrl: './get-product.component.scss',
})
export class GetProductComponent implements OnInit {
  categories: GetCategory[] = [];

  constructor(public adminS: AdminService) {}

  ngOnInit(): void {
    this.adminS.getCategories().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.categories = response;
        } else {
          console.error('La respuesta no es un array.');
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      },
    });
  }

  openDeleteModal(categoryId: number) {
    this.adminS.openModal(categoryId);
  }
}
