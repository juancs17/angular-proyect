import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CreateCategory } from '../../interdaces/interface';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent {
  name: string = '';
  image: File | null = null;

  constructor(
    private adminS: AdminService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.image = input.files[0];
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.name && this.image) {
      const token = this.cookieService.get('token');
      const category: CreateCategory = {
        name: this.name,
        image: this.image,
      };

      this.adminS.createCategory(category, token).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/categorias/productos']);
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
