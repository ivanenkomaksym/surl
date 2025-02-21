import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from '../summary/summary.component';
import { CreateShortenedUrl, GetSummaryUrl, ShortenUrl, ShortenUrlRegex } from '../../common';
import { SummaryResult } from '../common/SummaryResult';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, SummaryComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private http: HttpClient) { }
    
  originalUrl: string = '';
  shortUrl: string = '';
  shortenedUrl: string = '';
  summaryResult: SummaryResult | null = null;
  faviconUrl: string | null = null;
  summaryError: string | null = null;

  copyUrl() {
    navigator.clipboard.writeText(this.shortUrl);
    // You might want to add a toast/notification here
  }

  private async shortenUrl(url: string): Promise<string> {
    console.log(url);
    return new Promise((resolve, reject) => {
      this.http.get<{ short_url: string }>(ShortenUrl,
        { params: { long_url: url } }
      ).subscribe({
        next: (response) => resolve(CreateShortenedUrl(response.short_url)),
        error: (error) => reject(error)
      });
    });
  }

  private async getSummary(shortenedUrl: string): Promise<SummaryResult> {
    const matchedHex = shortenedUrl.match(ShortenUrlRegex);
    console.log(`Input: ${shortenedUrl} => Match: ${matchedHex ? matchedHex[0] : "No match"}`);
    if (!matchedHex) {
      throw new Error('Invalid shortened URL');
    }
    const matchedString = matchedHex[0];

    return new Promise((resolve, reject) => {
      this.http.get<SummaryResult>(
        GetSummaryUrl(matchedString)
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
    try {
      const result = await this.getSummary(this.shortenedUrl);
      console.log(result);
      this.summaryResult = result;
      const url = new URL(result.long_url);
      this.faviconUrl = `https://icons.duckduckgo.com/ip3/${url.hostname}.ico`;
      this.summaryError = null;
    } catch (error) {
      console.error(error);
      if ((error as any).status === 404) {
        this.summaryError = 'URL not found. Please check the shortened URL.';
      } else {
        if (error !== undefined) {
          this.summaryError = (error as string);
        } else {
          this.summaryError = 'Failed to fetch summary. Please try again.';
        }
      }
      this.summaryResult = null;
    }
  }
}