import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GlobalHeaderComponent } from './globals/global-header/global-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, GlobalHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-personal';
}
