import { PostsService } from './../../services/posts.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  users: User[];
  userPosts: Post[];
  selectedUser: User;
  posts: Post[];
  showLength = 3;
  showButton = true;
  constructor(
    private userService: UserService,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.log('Error Occured', error);
      }
    );
  }

  getUserPosts(user: User) {
    this.setSelectedUser(user);
    this.showButton = true;
    if (this.posts && this.posts.length > 0) {
      this.userPosts = this.filterUserPosts(this.posts, user.id);
    } else {
      this.postService.getPost().subscribe(
        (posts: Post[]) => {
          this.posts = posts;
          this.userPosts = this.filterUserPosts(posts, user.id);
        },
        (error) => {
          console.log('Error Occured', error);
        }
      );
    }
  }

  filterUserPosts(posts: Post[], id: number) {
    return posts.filter((item) => {
      return item.userId === id;
    });
  }

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }
}
