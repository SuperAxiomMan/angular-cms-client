import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../blogpost.service';
import { BlogPostModel } from '../models/blogpost.model';

@Component({
  selector: 'app-blogpost-edit',
  templateUrl: './blogpost-edit.component.html',
  styleUrls: ['./blogpost-edit.component.css'],
})
export class BlogpostEditComponent implements OnInit {
  blogPostId!: string | any;
  blogPost!: BlogPostModel;

  constructor(
    private formBuilder: FormBuilder,
    private blogPostService: BlogPostService,
    private element: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.blogPostId = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogPostService.getBlogPostById(this.blogPostId).subscribe(
      (data) => {
        this.blogPost = data;
      },
      (err) => console.log(err)
    );
  }

  uploadImg() {
    let inputElement: HTMLInputElement =
      this.element.nativeElement.querySelector('#blogImage');
    let filecount: number = inputElement.files!.length;
    let formData = new FormData();
    if (filecount > 0) {
      formData.append('blogImage', inputElement.files!.item(0)!);
      this.blogPostService.uploadImage(formData).subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
    }
  }

  updateBlogPost(formDirective: any) {
    console.log('ID', this.blogPostId);
    const editedBlogpost = this.blogPost;
    this.blogPostService
      .updateBlogPost(this.blogPostId, editedBlogpost)
      .subscribe(
        (data) => this.handleSuccess(data, formDirective),
        (error) => this.handleError(error)
      );
  }

  handleSuccess(data: object | any, formDirective: FormGroupDirective) {
    console.log('client : OK handleSuccess - blog post updated', data);
    formDirective.reset();
    formDirective.resetForm();
    this.blogPostService.dispatchBlogPostCreated(data._id);
  }
  handleError(err: Error) {
    console.log('Client : blog post update failed', err);
  }
}
