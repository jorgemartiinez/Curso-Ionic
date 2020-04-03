import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log('DISPARO');
    this.posts = this.dataService.getPosts();
    /*.subscribe((posts: PostModel[]) => {
      this.posts = posts;
    });*/
  }

  escuchaClick( id: number ) {
    console.log('Click en:' + id);
  }

}
