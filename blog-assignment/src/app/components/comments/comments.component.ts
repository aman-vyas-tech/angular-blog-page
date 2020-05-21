import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent {
  @Input() comment: Comment;
}
