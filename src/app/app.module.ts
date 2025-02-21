import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { AnalyticsTableComponent } from './analytics-table/analytics-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SummaryComponent,
    AnalyticsTableComponent
  ],
  imports: [
    // ... other imports ...
    HomeComponent,
    SummaryComponent,
    FormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
}) 
export class AppModule { } 