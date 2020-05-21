import { PostsService } from './../../services/posts.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public users: any;
  public userPosts: any;
  public selectedUser: any;
  public posts: any;
  public showLength = 3;
  public showButton = true;
  constructor(private userService: UserService,
              private postService: PostsService) { }

  ngOnInit(): void {
    this.getUsersData();
  }

  public getUsersData() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
    })
  }

  public getUserPosts(user) {
    this.setSelectedUser(user);
    this.showButton = true;
    if(this.posts && this.posts.length >0) {
      this.userPosts = this.filterUserPosts(this.posts, user.id);
    } else {
      this.postService.getPost().subscribe(posts => {
        this.posts = posts;
        console.log(posts);
        this.userPosts = this.filterUserPosts(posts, user.id);
      });
    }
  }

  public filterUserPosts(posts, id) {
    return posts.filter(item => {
      return item.userId === id;
    });
  }

  public setSelectedUser(user) {
    this.selectedUser = user;
  }

}
