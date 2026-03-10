import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-video-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-chat.html',
  styleUrl: './video-chat.scss'
})
export class VideoChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  videos: any[] = [];
  selectedVideo: any = null;

  messages: { role: 'user' | 'ai', text: string }[] = [];
  question: string = '';
  loading: boolean = false;
  syncing: boolean = false;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.loadVideos();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  loadVideos() {
    this.resourceService.getResources().subscribe((res: any) => {
      // Filter only videos from Dealernet
      this.videos = res.filter((r: any) => (r.type || '').toUpperCase() === 'VIDEO');
    });
  }

  syncVideos() {
    this.syncing = true;
    this.resourceService.syncGeminiVideos().subscribe({
      next: (res: any) => {
        alert(`${res.syncedCount} vídeos foram sincronizados com o Gemini!`);
        this.syncing = false;
        this.loadVideos();
      },
      error: (err) => {
        console.error('Error syncing videos', err);
        alert('Erro ao sincronizar vídeos.');
        this.syncing = false;
      }
    });
  }

  selectVideo(video: any) {
    this.selectedVideo = video;
    this.messages = [];
    this.scrollToBottom();
  }

  askQuestion() {
    if (!this.selectedVideo || !this.question.trim() || this.loading) return;

    const userQ = this.question;
    this.messages.push({ role: 'user', text: userQ });
    this.question = '';
    this.loading = true;

    this.resourceService.askGemini(this.selectedVideo.id, userQ).subscribe({
      next: (res: any) => {
        if (res.error) {
          this.messages.push({ role: 'ai', text: 'Erro: ' + res.error });
        } else {
          this.messages.push({ role: 'ai', text: res.answer || 'Desculpe, não consegui obter uma resposta para isso.' });
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.messages.push({ role: 'ai', text: 'Desculpe, ocorreu um erro na requisição do servidor. O vídeo não está sincronizado ou a API falhou.' });
        this.loading = false;
      }
    });
  }
}
