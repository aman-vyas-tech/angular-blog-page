import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService],
    });
    service = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getComments', () => {
    it('should return an Observable<Comment[]>', () => {
      const dummyComments = [
        {
          id: 1,
          title: 'Comment 1',
        },
        {
          id: 1,
          title: 'COmments 2',
        },
      ];
      service.getComments().subscribe((comments: any) => {
        expect(comments.length).toBe(2);
        expect(comments).toEqual(dummyComments);
      });

      const req = httpMock.expectOne(
        'https://jsonplaceholder.typicode.com/comments'
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyComments);
    });
  });
});
