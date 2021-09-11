import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPostService } from '../blogpost.service';
import { BlogPostModel } from '../models/blogpost.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css'],
})
export class BlogpostComponent implements OnInit {
  blogpost$!: Observable<BlogPostModel>;
  imagePath: string = environment.imagePath;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogpostService: BlogPostService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.blogpost$ = this.blogpostService.getBlogPostById(id!);
  }
}
