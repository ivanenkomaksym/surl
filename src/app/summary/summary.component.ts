import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsTableComponent } from '../analytics-table/analytics-table.component';
import { SummaryResult } from '../common/SummaryResult';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  standalone: true,
  imports: [CommonModule, AnalyticsTableComponent]
})

export class SummaryComponent {
  @Input() summaryResult: SummaryResult | null = null;
  @Input() summaryError: string | null = null;
  @Input() faviconUrl: string | null = null;
}
