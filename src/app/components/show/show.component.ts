import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/post.model';
import { PostService } from 'src/app/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  Posts: Post[];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((res) => {
      this.Posts = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Post),
        };
      });
    });
  }

  deleteRow(id: string): void {
    this.postService.deletePost(id).then(() => {
      // Optionally, show a message to the user
      console.log('Post deleted successfully!');
      // Refresh the list or handle the UI update here
      this.Posts = this.Posts.filter(post => post.id !== id);
    }).catch(error => {
      console.error('Error deleting post:', error);
    });
  }
}