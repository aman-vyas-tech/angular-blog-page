import { CommentsService } from './../../services/comments.service';
import { Component, Input, OnDestroy } from '@angular/core';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() post: Post;
  @Input() user: User;
  selectedPost: Post;
  comments: Comment[];
  userComments: Comment[];
  showComments = false;
  constructor(private commentsService: CommentsService) {}

  getUserComments(post: Post) {
    if (this.showComments === true) {
      this.showComments = false;
    } else {
      if (this.comments && this.comments.length > 0) {
        this.userComments = this.filterUsercomments(this.comments, post.id);
        this.showComments = true;
      } else {
        this.commentsService.getComments().subscribe(
          (comments: Comment[]) => {
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

  filterUsercomments(comments: Comment[], id: number) {
    return comments.filter((comment: Comment) => comment.postId === id);
  }
}
