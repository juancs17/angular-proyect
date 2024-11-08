import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../authService/auth-service.service';
import { InterLogin } from '../interface/interface';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  credentials: InterLogin = {
    email: '',
    password: '',
  };

  constructor(
    private authLoginService: AuthService,
    private formB: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loginForm = this.formB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.credentials.email = this.loginForm.get('email')?.value;
      this.credentials.password = this.loginForm.get('password')?.value;

      this.authLoginService.login(this.credentials).subscribe({
        next: (response) => {
          const token = response.token;

          this.cookieService.set('token', token);

          this.router.navigate(['/admin/categorias/productos']);
        },
        error: (error) => {
          console.error('Error en el inicio de sesión', error);
        },
      });
    }
  }
}
