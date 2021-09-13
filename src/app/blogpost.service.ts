import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BlogPostModel } from './models/blogpost.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  baseUrl: string = 'http://localhost:3000/api/v1';
  private blogPostCreated = new Subject<String>();

  constructor(private httpClient: HttpClient) {}

  createBlogPost(blogPost: BlogPostModel) {
    return this.httpClient.post<BlogPostModel[]>(
      `${this.baseUrl}/blog-posts`,
      blogPost
    );
  }

  uploadImage(formData: FormData) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/blog-posts/images`,
      formData
    );
  }

  dispatchBlogPostCreated(id: string) {
    this.blogPostCreated.next(id); //used to send messages to an observable
  }

  handleBlogPostCreated(): Observable<String> {
    return this.blogPostCreated.asObservable();
  }

  getBlogPosts(): Observable<BlogPostModel[]> {
    return this.httpClient.get<BlogPostModel[]>(`${this.baseUrl}/blog-posts`);
  }

  getBlogPostById(id: string): Observable<BlogPostModel> {
    return this.httpClient.get<BlogPostModel>(
      `${this.baseUrl}/blog-posts/${id}`
    );
  }

  updateBlogPost(id: string, blogPost: BlogPostModel) {
    console.log('called updateService')
    return this.httpClient.put(
      `${this.baseUrl}/blog-posts/${id}`,blogPost
    );
  }

  deleteSingleBlogPost(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/blog-posts/${id}`);
  }

  deleteMultiBlogPost(ids: string[]) {
    const idArray = ids.join(',');
    return this.httpClient.delete(`${this.baseUrl}/blog-posts/?ids=${idArray}`);
  }
}
