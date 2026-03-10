import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { AuthGuard } from './core/guards/auth.guard';
import { VideoChatComponent } from './components/video-chat/video-chat';
import { VideoListComponent } from './components/video-list/video-list';
import { VideoDetail } from './components/video-detail/video-detail';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'treinamentos', pathMatch: 'full' },
            { path: 'treinamentos', component: VideoListComponent },
            { path: 'video-chat', component: VideoChatComponent },
            { path: 'video/:id', component: VideoDetail }
        ]
    },
    { path: '**', redirectTo: '' }
];
