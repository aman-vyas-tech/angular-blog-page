import { Comment } from './../../models/comment';
import { Post } from './../../models/post';
import { CommentsService } from './../../services/comments.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';

import { of, throwError } from 'rxjs';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let commentService: CommentsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostComponent],
      providers: [CommentsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    commentService = TestBed.get(CommentsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getUsersComments()', () => {
    it('should check showComments when true', async(() => {
      const post = {} as Post;
      component.showComments = true;
      component.getUserComments(post);
      fixture.detectChanges();
      expect(component.showComments).toEqual(false);
    }));

    it('should get called list of users from commentsService', async(() => {
      const response: Comment[] = [
        {
          postId: 1,
          id: 1,
          name: 'dummyData',
          email: 'dummyData',
          body: 'dummyData',
        },
        {
          postId: 1,
          id: 1,
          name: 'dummyData',
          email: 'dummyData',
          body: 'dummyData',
        }
      ];
      const post = {} as Post;
      spyOn(commentService, 'getComments').and.returnValue(of(response));
      component.getUserComments(post);
      fixture.detectChanges();
      expect(component.comments).toEqual(response);
    }));

    it('should check list of comments available', () => {
      const dummyComments: Comment[] = [
        {
          postId: 1,
          id: 1,
          name: 'dummyData',
          email: 'dummyData',
          body: 'dummyData',
        },
        {
          postId: 1,
          id: 1,
          name: 'dummyData',
          email: 'dummyData',
          body: 'dummyData',
        }
      ];
      const post = {} as Post;
      component.showComments = false;
      component.comments = dummyComments;
      component.getUserComments(post);
      fixture.detectChanges();
      expect(component.showComments).toBe(true);
      expect(component.comments).toEqual(dummyComments);
    });

    it('should get called error block of getUsers subscription', async(() => {
      const post = {} as Post;
      spyOn(commentService, 'getComments').and.returnValue(
        throwError({ status: 404 })
      );
      component.getUserComments(post);
      fixture.detectChanges();
      expect(component.error.status).toEqual(404);
    }));
  });
});
