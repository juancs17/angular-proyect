import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service'; // Asegúrate de la ruta correcta
import { CreateProduct } from '../../interdaces/interface'; // Asegúrate de la ruta correcta
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  name: string = '';
  image: File | null = null;

  constructor(private adminService: AdminService, private cookieService: CookieService) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.image = input.files[0];
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Evita que se recargue la página

    if (this.name && this.image) {
      const token = this.cookieService.get('token'); // Asegúrate de que el token está guardado en las cookies
      const product: CreateProduct = {
        name: this.name,
        image: this.image
      };

      this.adminService.createProduct(product, token).subscribe({
        next: (response) => {
          console.log('Producto creado:', response);
          // Aquí puedes redirigir o mostrar un mensaje de éxito
        },
        error: (error) => {
          console.error('Error al crear el producto:', error);
        },
      });
    } else {
      console.error('Nombre o imagen faltantes');
    }
  }
}
