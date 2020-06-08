import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsService } from './../../services/posts.service';
import { UserService } from './../../services/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { User } from 'src/app/models/user';
import { of, throwError } from 'rxjs';
import { Post } from 'src/app/models/post';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let postService: PostsService;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HeaderComponent],
      providers: [UserService, PostsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    postService = TestBed.get(PostsService);
    userService = TestBed.get(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should get called after initializing component', () => {
      spyOn(component, 'ngOnInit');
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.ngOnInit).toHaveBeenCalled();
    });
  });

  describe('getUsersData()', () => {

    it('should get called list of users from userService', async(() => {
      const response: User[] = [];
      spyOn(userService, 'getUsers').and.returnValue(of(response));
      component.getUsersData();
      fixture.detectChanges();
      expect(component.users).toEqual(response);
    }));

    it('should get called error block of getUsers subscription', async(() => {
      spyOn(userService, 'getUsers').and.returnValue(throwError({status: 404}));
      component.getUsersData();
      fixture.detectChanges();
      expect(component.error.status).toEqual(404);
    }));
  });


  describe('getUserPosts()', () => {
    
    it('should get called list of posts from PostService', async(() => {
      const response: Post[] = [];
      const user = {} as User;
      spyOn(postService, 'getPost').and.returnValue(of(response));
      component.posts = null;
      component.getUserPosts(user);
      fixture.detectChanges();
      expect(component.posts).toEqual(response);
    }));

    it('should check list of posts available',() => {
      const dummyPosts: Post[] = [{
        userId: 1,
        id: 1,
        title: 'dummy',
        body: 'dummy',
      },
      {
        userId: 1,
        id: 1,
        title: 'dummy',
        body: 'dummy',
      }];
      const user = {} as User;
      component.posts = dummyPosts;
      component.getUserPosts(user);
      fixture.detectChanges();
      expect(component.posts).toEqual(dummyPosts);
    });

    it('should get called error block of getUserPosts subscription', async(() => {
      const user = {} as User;
      spyOn(postService, 'getPost').and.returnValue(throwError({status: 404}));
      component.getUserPosts(user);
      fixture.detectChanges();
      expect(component.error.status).toEqual(404);
    }));
  });

});
