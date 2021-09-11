import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { BlogPostService } from '../blogpost.service';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css'],
})
export class BlogpostCreateComponent implements OnInit {
  creationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private blogPostService: BlogPostService,
    private element: ElementRef
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.creationForm = this.formBuilder.group({
      title: '',
      subtitle: '',
      content: '',
      blogImage: '',
    });
  }

  createBlogPost(formDirective: FormGroupDirective) {
    if (this.creationForm.valid) {
      console.log(this.creationForm);
      this.blogPostService
        .createBlogPost(this.creationForm.value)
        .subscribe((data) => {
          this.handleSucess(data, formDirective),
            (err: Error) => {
              this.handleError(err);
            };
        });
    }
  }

  uploadImg() {
    let inputElement: HTMLInputElement =
      this.element.nativeElement.querySelector('#blogImage');
    let filecount: number = inputElement.files!.length;
    if (filecount > 0) {
      let formData = new FormData();
      formData.append('blogImage', inputElement.files!.item(0)!);
      this.blogPostService.uploadImage(formData).subscribe((data) => {
        console.log(data),
          (err: Error) => {
            console.log(err);
          };
      });
    }
  }

  handleSucess(data: object | any, formDirective: FormGroupDirective) {
    console.log('Post created', data);
    this.creationForm.reset();
    formDirective.resetForm();
    this.blogPostService.dispatchBlogPostCreated(data._id);
  }

  handleError(err: Error) {
    console.log('error whil creating post', err);
  }
}
