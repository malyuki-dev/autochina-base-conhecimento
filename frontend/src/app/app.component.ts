import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: '../styles.scss'
})
export class AppComponent {
  title = 'Autochina';
  isSidebarOpen: boolean = window.innerWidth >= 768;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}