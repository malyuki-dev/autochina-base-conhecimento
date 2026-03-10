import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';

@Component({
    selector: 'app-video-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './video-list.html',
    styleUrl: './video-list.scss'
})
export class VideoListComponent implements OnInit {
    videos: any[] = [];
    loading: boolean = true;

    constructor(private resourceService: ResourceService, private router: Router) { }

    ngOnInit() {
        this.loadVideos();
    }

    loadVideos() {
        this.loading = true;
        this.resourceService.getResources().subscribe({
            next: (res: any) => {
                this.videos = res.filter((r: any) => (r.type || '').toUpperCase() === 'VIDEO');
                console.log('Processed videos', this.videos);
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading videos', err);
                this.loading = false;
            }
        });
    }

    openVideo(video: any) {
        if (video && video.id) {
            this.router.navigate(['/video', video.id]);
        }
    }
}
