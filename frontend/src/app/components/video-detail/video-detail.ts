import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { Resource, Step } from '../../models/resource.model';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-detail.html',
  styleUrl: './video-detail.scss',
})
export class VideoDetail implements OnInit {
  video: Resource | null = null;
  loading: boolean = true;
  error: string | null = null;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadVideo(id);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  loadVideo(id: string): void {
    this.loading = true;
    this.resourceService.getResourceById(id).subscribe({
      next: (res) => {
        this.video = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading video detail', err);
        this.error = 'Não foi possível carregar o vídeo solicitado.';
        this.loading = false;
      }
    });
  }

  handleSeek(timeStr?: string): void {
    if (!timeStr || !this.videoPlayer?.nativeElement) return;

    try {
      const timeParts = timeStr.trim().split(':');
      let totalSeconds = 0;

      // Suporta formato MM:SS ou HH:MM:SS
      if (timeParts.length === 2) {
        totalSeconds = parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);
      } else if (timeParts.length === 3) {
        totalSeconds = parseInt(timeParts[0], 10) * 3600 + parseInt(timeParts[1], 10) * 60 + parseInt(timeParts[2], 10);
      } else {
        return;
      }

      if (!isNaN(totalSeconds)) {
        this.videoPlayer.nativeElement.currentTime = totalSeconds;
        this.videoPlayer.nativeElement.play();
      }
    } catch (e) {
      console.error('Error parsing time string', e);
    }
  }

  goBack(): void {
    this.router.navigate(['/treinamentos']);
  }

  getColorClass(index: number): string {
    const colors = ['bg-primary', 'bg-secondary', 'bg-accent'];
    return colors[index % colors.length];
  }
}
