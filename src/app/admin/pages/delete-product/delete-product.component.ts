import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [NgIf],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent implements OnInit {

  isOpen = false;

  constructor(private modalService: AdminService) {}

  ngOnInit() {
    this.modalService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }
}


