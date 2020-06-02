import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers = [
        {
          id: 1,
          name: 'dummy',
          username: 'dummy',
          email: 'dummy',
          address: {
            street: 'dummy',
            suite: 'dummy',
            city: 'dummy',
            zipcode: 1,
            geo: {
              lat: 1,
              lng: 1,
            },
          },
          phone: 'dummy',
          website: 'dummy',
          company: {
            name: 'dummy',
            catchPhrase: 'dummy',
            bs: 'dummy',
          },
        },
        {
          id: 1,
          name: 'dummy',
          username: 'dummy',
          email: 'dummy',
          address: {
            street: 'dummy',
            suite: 'dummy',
            city: 'dummy',
            zipcode: 1,
            geo: {
              lat: 1,
              lng: 1,
            },
          },
          phone: 'dummy',
          website: 'dummy',
          company: {
            name: 'dummy',
            catchPhrase: 'dummy',
            bs: 'dummy',
          },
        }
      ];
      service.getUsers().subscribe((users: any) => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });
  });
});
