import { CommentsService } from './../../services/comments.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() post: any;
  @Input() user: any;
  public selectedPost: any;
  public comments: any;
  userComments: any;
  showComments = false;
  constructor(private commentsService: CommentsService) {}

  public getUserComments(post) {
    this.setSelectedUser(post);
    if (this.showComments === true) {
      this.showComments = false;
    } else {
      if (this.comments && this.comments.length > 0) {
        this.userComments = this.filterUsercomments(this.comments, post.id);
        this.showComments = true;
      } else {
        this.commentsService.getComments().subscribe(
          (comments) => {
            this.comments = comments;
            this.userComments = this.filterUsercomments(this.comments, post.id);
            this.showComments = true;
          },
          (error) => {
            console.log('Error Occured', error);
          }
        );
      }
    }
  }

  public filterUsercomments(comments, id) {
    return comments.filter((item) => {
      return item.postId === id;
    });
  }

  public setSelectedUser(user) {
    this.selectedPost = user;
  }
}
