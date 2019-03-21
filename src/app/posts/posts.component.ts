import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import * as toastr from 'toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  editable = false;
  showGrid = false;
  showForm = false;
  posts: any[] = [];
  myPost = {
    id: 0,
    title: '',
    body: ''
  };

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.recupPosts();
  }

  // recuper all posts
  recupPosts() {
    this.postService.getAllPosts().subscribe((res: any[]) => {
      this.posts = res;
    });
  }

  // create post
  saddPost(f) {
    if (f.valid) {
      this.postService.persistPost(this.myPost)
        .subscribe(res => {
          this.posts.unshift(res);
          this.initPost();
          toastr.success('This post is created Successfully');
          this.showForm = false;
        },
          (err) => {
            toastr.error(err.message);
          });
    } else {
      toastr.error('Error');
    }
  }

  // delete post
  removePost(id, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.postService.deletePost(id)
          .subscribe(res => {
            this.posts.splice(index, 1);
            toastr.success('This post is deleted Successfully');
          },
            (err) => toastr.error(err.message));
        Swal.fire(
          {
            title: 'Course is deleted',
            text: 'You will not be able to recover this imaginary file!',
            type: 'success',
            timer: 3000
          }
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          {
            title: 'Cancelled',
            text: 'Your post is safe :)',
            type: 'error',
            timer: 3000
          }
        );
      }
    });
  }

  // update post
  editPost(post) {
    this.myPost = post;
    this.editable = true;
    this.showForm = true;
  }


  updatePost() {
    this.postService.updatePost(this.myPost).subscribe(res => {
      this.editable = false;
      this.showForm = false;
      this.initPost();
      toastr.info('This post is update Successufully');
    });
  }

  initPost() {
    this.myPost = {
      id: 0,
      title: '',
      body: ''
    };
  }

}
