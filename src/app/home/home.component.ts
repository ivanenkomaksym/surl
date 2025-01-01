import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
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
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private http: HttpClient) { }
    
  originalUrl: string = '';
  shortUrl: string = '';

  copyUrl() {
    navigator.clipboard.writeText(this.shortUrl);
    // You might want to add a toast/notification here
  }

  private async shortenUrl(url: string): Promise<string> {
    console.log(url);
    return new Promise((resolve, reject) => {
      this.http.get<{short_url: string}>('https://rust-short-url-961241853090.europe-central2.run.app/shorten',
        { params: {long_url: url} }
      ).subscribe({
        next: (response) => resolve("https://surl.ivanenkomak.com/" + response.short_url),
        error: (error) => reject(error)
      });
    });
  }

  async shorten() {
    this.shortUrl = await this.shortenUrl(this.originalUrl);
  }
}