import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
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
  serverMessageError: string = '';

  constructor(
    private blogpostService: BlogPostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/auth']);
    }
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

  handleError(err: Error) {
    this.serverMessageError = `Error ${err.message} - ${err.name}`
    console.log(err);
  }

  logout() {
    this.authService.logout().subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/auth']);
      },
      (err: Error) => console.log(err)
    );
  }
}
