import { CommonModule } from '@angular/common'; 
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  @Input() summaryResult: { short_url: string, long_url: string, clicks: number } | null = null;
  @Input() summaryError: string | null = null;
  @Input() faviconUrl: string | null = null;
}
