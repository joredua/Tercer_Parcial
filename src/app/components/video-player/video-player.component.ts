// src/app/components/video-player/video-player.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//import { VideoService } from '../video.service';  // Ajusta la ruta según la estructura de tu proyecto

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  title: string;
  url: SafeResourceUrl;
  descripcion: string;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
   // private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.getYoutubeEmbedUrl(params['url']));
      this.descripcion = params['descripcion'];

     /* this.videoService.setVideoData({
        title: this.title,
        url: this.url,
        descripcion: this.descripcion
      });*/
    });
  }

  private getYoutubeEmbedUrl(url: string): string {
    if (url.includes('youtube.com')) {
      const videoId = url.split('v=')[1];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return url;
  }
}
