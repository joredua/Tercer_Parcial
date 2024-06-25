// src/app/video.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videoData = new BehaviorSubject<any>(null);

  setVideoData(data: any) {
    this.videoData.next(data);
  }

  getVideoData() {
    return this.videoData.asObservable();
  }
}
