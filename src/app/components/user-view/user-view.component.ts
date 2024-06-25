import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/post.model';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  Posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPublicPosts().subscribe(
      (res) => {
        this.Posts = res as Post[]; // Asegura TypeScript que res es del tipo Post[]
      },
      (error) => {
        console.error('Error fetching public posts:', error);
      }
    );
  }
}
