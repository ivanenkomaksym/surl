import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="url-shortener">
      <div class="url-group">
        <label>Long URL</label>
        <input type="text" [value]="originalUrl" class="url-input">
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
  @Input() originalUrl: string = '';
  @Input() shortUrl: string = '';

  copyUrl() {
    navigator.clipboard.writeText(this.shortUrl);
    // You might want to add a toast/notification here
  }

  shorten() {
    this.shortUrl = 'https://surl.ivanenkomak.com/F9064C6C';
  }
}