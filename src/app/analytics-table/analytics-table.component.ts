import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

interface AnalyticsData {
  created_at: string;
  language?: string | null;
  os?: string | null;
  ip?: string | null;
  location?: string | null;
}

@Component({
  selector: 'app-analytics-table',
  templateUrl: './analytics-table.component.html',
  styleUrls: ['./analytics-table.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe, MatTableModule]
})
export class AnalyticsTableComponent {
  @Input() analytics: AnalyticsData[] = [];

  displayedColumns: string[] = ['created_at', 'language', 'os', 'ip', 'location'];
    
  dataSource = new MatTableDataSource();
}
