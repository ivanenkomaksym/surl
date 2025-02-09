import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="url-shortener">
      <div class="url-group">
        <label>Long URL</label>
        <input type="text" [(ngModel)]="originalUrl" class="url-input">
      </div>
      
      <div class="url-group">
        <label>Short URL</label>
        <input type="text" [value]="shortUrl" readonly class="url-input">
      </div>

      <div class="button-container">
        <button class="shorten" (click)="shorten()">Shorten</button>
        <button class="copy-button" (click)="copyUrl()">Copy</button>
      </div>
      
      <div class="url-group">
        <label>Shorten URL</label>
        <input type="text" [(ngModel)]="shortenedUrl" class="url-input">
      </div>

      <div class="button-container">
        <button class="summary" (click)="summary()">Summary</button>
      </div>
      
      <div *ngIf="summaryResult" class="summary-result">
        <div class="summary-item">
          <label>Short URL:</label>
          <span>{{summaryResult.short_url}}</span>
        </div>
        <div class="summary-item">
          <label>Long URL:</label>
          <span>{{summaryResult.long_url}}</span>
        </div>
        <div class="summary-item">
          <label>Clicks:</label>
          <span>{{summaryResult.clicks}}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private http: HttpClient) { }
    
  originalUrl: string = '';
  shortUrl: string = '';
  shortenedUrl: string = '';
  summaryResult: {short_url: string, long_url: string, clicks: number} | null = null;

  copyUrl() {
    navigator.clipboard.writeText(this.shortUrl);
    // You might want to add a toast/notification here
  }

  private async shortenUrl(url: string): Promise<string> {
    console.log(url);
    return new Promise((resolve, reject) => {
      this.http.get<{short_url: string}>('http://localhost/shorten',
        { params: {long_url: url} }
      ).subscribe({
        next: (response) => resolve("https://short.ivanenkomak.com/" + response.short_url),
        error: (error) => reject(error)
      });
    });
  }

  private async getSummary(shortenedUrl: string): Promise<{short_url: string, long_url: string, clicks: number}> {
    console.log(shortenedUrl);
    return new Promise((resolve, reject) => {
      this.http.get<{short_url: string, long_url: string, clicks: number}>(
        `http://localhost/${shortenedUrl}/summary`
      ).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error)
      });
    });
  }

  async shorten() {
    this.shortUrl = await this.shortenUrl(this.originalUrl);
  }

  async summary() {
    const result = await this.getSummary(this.shortenedUrl);
    console.log(result);
    this.summaryResult = result;
  }
}