import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../services/admin.service'; // Asegúrate de que la ruta sea correcta
import { GetCategory } from '../../interdaces/interface'; // Asegúrate de que la interfaz esté creada
// import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
// import { MessageFlashService } from '../../../shared/components/message-flash/message-flash.service';


@Component({
  selector: 'app-get-product',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './get-product.component.html',
  styleUrl: './get-product.component.scss'
})
export class GetProductComponent implements OnInit {

  categories: GetCategory[] = [];

  constructor(
    private adminS: AdminService,

  ) {}

  
    ngOnInit(): void {
      this.adminS.getCategories().subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            this.categories = response; 
            console.log('Categorías cargadas:', this.categories);
          } else {
            console.error('La respuesta no es un array.');
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos', error);
        },
      });
    }

  openDeleteModal() {
    this.adminS.openModal();
  }

}






