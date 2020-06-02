import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PostsService ]
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPosts', () => {
    it('should return an Observable<Posts[]>', () => {
      const dummyPosts = [
        {
          id: 1,
          title: 'Post Title'
        },
        {
          id: 1,
          title: 'Post Title'
        }
      ];
      service.getPost().subscribe((posts: any) => {
        expect(posts.length).toBe(2);
        expect(posts).toEqual(dummyPosts);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
      expect(req.request.method).toBe('GET');
      req.flush(dummyPosts);
    });
  });

});
