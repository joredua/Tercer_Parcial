import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFirestore: AngularFirestore) { }

  getPosts() {
    return this.angularFirestore
               .collection("posts")
               .snapshotChanges();
  }

  getPostById(id: string) {
    return this.angularFirestore
               .collection("posts")
               .doc(id)
               .valueChanges();
  }

  createPost(post: Post) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
          .collection("posts")
          .add(post)
          .then(response => {
            console.log(response);
            resolve(response);
          }, error => reject(error));
    });
  }

  updatePost(post: Post, id: string) {
    return this.angularFirestore
               .collection("posts")
               .doc(id)
               .update({
                 title: post.title,
                 url: post.url,
                 descripcion: post.descripcion,
                 
               });
  }

  deletePost(id: string) {
    return this.angularFirestore
               .collection("posts")
               .doc(id)
               .delete();
  }

  getPublicPosts() {
    return this.angularFirestore
               .collection("posts", ref => ref.where('public', '==', true))
               .valueChanges({ idField: 'id' }) ;
  }
}

