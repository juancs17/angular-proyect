import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [NgIf],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss',
})
export class DeleteProductComponent implements OnInit {
  isOpen = false;
  categoryId: number | null = null;

  constructor(
    private modalService: AdminService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.modalService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.modalService.categoryId$.subscribe((id) => {
      this.categoryId = id;
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.categoryId !== null) {
      const token = this.cookieService.get('token');

      this.modalService.deleteCategory(this.categoryId, token).subscribe({
        next: (response) => {
          console.log('response', response);
          this.router.navigate(['/admin/categorias/productos']);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al eliminar el producto:', error);
        },
      });
    } else {
      console.error('No se ha establecido categoryId.');
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
