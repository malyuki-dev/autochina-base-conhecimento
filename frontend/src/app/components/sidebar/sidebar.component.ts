import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
    @Input() isOpen: boolean = true;
    @Output() closeSidebar = new EventEmitter<void>();

    videos: any[] = [];
    categories: string[] = [];
    currentRoute: string = '';

    constructor(
        private resourceService: ResourceService,
        private router: Router
    ) {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.currentRoute = event.urlAfterRedirects;
            }
        });
    }

    ngOnInit(): void {
        this.resourceService.getResources().subscribe({
            next: (res: any) => {
                this.videos = res.filter((r: any) => (r.type || '').toUpperCase() === 'VIDEO');
                const uniqueCategories = new Set(this.videos.map(v => v.category));
                this.categories = Array.from(uniqueCategories);
            },
            error: (err) => console.error('Erro ao carregar videos na sidebar', err)
        });
    }

    getVideosByCategory(category: string): any[] {
        return this.videos.filter(v => v.category === category);
    }

    isActive(url: string): boolean {
        return this.currentRoute === url;
    }

    handleMobileClose(): void {
        if (window.innerWidth < 768) {
            this.closeSidebar.emit();
        }
    }

    onClickClose(): void {
        this.closeSidebar.emit();
    }
}
