import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPostService } from '../blogpost.service';
import { BlogPostModel } from '../models/blogpost.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  // blogposts$!: Observable<BlogPostModel[]>;

  allBlogPosts!: BlogPostModel[];
  selectedId?: string;

  constructor(private blogpostService: BlogPostService) {}

  ngOnInit(): void {
    // this.blogposts$ = this.blogpostService.getBlogPosts();
    this.blogpostService.getBlogPosts().subscribe((data) => {
      this.refresh(data);

      this.blogpostService.handleBlogPostCreated().subscribe((data) => {
        console.log('adminComp received : ', data);
        this.refresh(data);
      });
    });
  }

  deleteBlogPosts(selectedOptions: any) {
    const ids = selectedOptions.map((e: any) => {
      return e.value;
    });

    console.log(ids);

    return ids.length === 1
      ? this.blogpostService.deleteSingleBlogPost(ids[0]).subscribe((data) => {
          this.refresh(data),
            (err: Error) => {
              this.handleError(err);
            };
        })
      : this.blogpostService.deleteMultiBlogPost(ids).subscribe((data) => {
          this.refresh(data),
            (err: Error) => {
              this.handleError(err);
            };
        });
  }

  refresh(data: object) {
    console.log('data', data);
    this.blogpostService.getBlogPosts().subscribe((data) => {
      this.allBlogPosts = data;
    });
  }

  handleError(error: Error) {
    console.log(error);
  }
}
