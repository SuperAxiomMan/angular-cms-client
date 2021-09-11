import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPostService } from '../blogpost.service';
import { BlogPostModel } from '../models/blogpost.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css'],
})
export class BlogpostListComponent implements OnInit {
  blogPostList$!: Observable<BlogPostModel[]>;
  imagePath: string = environment.imagePath;

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit(): void {
    this.blogPostList$ = this.blogPostService.getBlogPosts();
  }
}
