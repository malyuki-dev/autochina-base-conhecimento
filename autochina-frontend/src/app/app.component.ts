import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceService } from './services/resource.service'; // Ajuste o caminho se necessário
import { Resource } from './models/resource.model';         // Ajuste o caminho se necessário

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html', // Recomendo usar arquivo separado para código sênior
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  resources: Resource[] = [];

  constructor(private resourceService: ResourceService) {}

  ngOnInit() {
    this.resourceService.getResources().subscribe({
      next: (data) => this.resources = data,
      error: (err) => console.error('Erro Autochina:', err)
    });
  }
}