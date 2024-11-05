import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetCategory } from '../../interdaces/interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-put-product',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './put-product.component.html',
  styleUrl: './put-product.component.scss',
})
export class PutProductComponent implements OnInit {
  idCategory: any;
  categories: GetCategory[] = [];
  category: GetCategory | undefined;
  categoryForm: FormGroup;

  constructor(
    private cookieService: CookieService,
    private adminS: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.categoryForm = this.formBuilder.group({
      name: [''],
      image: [null],
    });
  }

  ngOnInit(): void {
    this.idCategory = this.route.snapshot.paramMap.get('id');
    this.adminS.getCategories().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.categories = response;

          this.category = this.categories.find((cat) => {
            return cat.id == this.idCategory;
          });

          if (this.category) {
            this.categoryForm.patchValue({
              name: this.category.name,
            });
          } else {
            console.warn(
              'No se encontró la categoría con el id:',
              this.idCategory
            );
          }
        } else {
          console.error('La respuesta no es un array.');
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      },
    });
  }
  onSubmit(): void {
    if (this.categoryForm.valid) {
      const token = this.cookieService.get('token');
      if (!token) {
        console.error('Token no encontrado');
        return;
      }
      this.adminS
        .updateCategory(this.categoryForm.value, this.idCategory, token)
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/categorias/productos']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
