import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
   public editForm: FormGroup
   postRef: any
  constructor(
    public postService: PostService,
    public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public router: Router
  ) { 
    this.editForm = this.FormBuilder.group({
      title: [''],
      url: [''],
      descripcion: [''],
    })
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.postService.getPostById(id).subscribe(res =>{
      this.postRef = res
      this.editForm = this.FormBuilder.group({
        title: [this.postRef.title],
        url: [this.postRef.url],
        descripcion: [this.postRef.descripcion],
      })
    })
  }
  onSubmit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.postService.updatePost(this.editForm.value, id)
    this.router.navigate(['/show '])
  }

}
