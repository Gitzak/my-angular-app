import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private postService: PostService) { }

  idPost: 0;
  comments: any[] = [];
  myPost: any = {
    id: 0,
    title: '',
    body: ''
  };

  ngOnInit() {
    this.idPost = this.router.snapshot.params.id;
    this.recupPostById();
    this.recupComments();
  }

  recupPostById() {
    this.postService.getPost(this.idPost).subscribe(res => {
      this.myPost = res;
    });
  }

  recupComments() {
    this.postService.getCommentsPost(this.idPost).subscribe((res: any[]) => {
      this.comments = res;
    });
  }

}
