import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Analytic } from '../common/Analytic';

@Component({
  selector: 'app-analytics-table',
  templateUrl: './analytics-table.component.html',
  styleUrls: ['./analytics-table.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe, MatTableModule]
})
export class AnalyticsTableComponent {
  @Input() analytics: Analytic[] = [];

  displayedColumns: string[] = ['created_at', 'language', 'os', 'ip', 'location'];
    
  dataSource = new MatTableDataSource();
}
