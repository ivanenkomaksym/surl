import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
@NgModule({
  declarations: [
    HomeComponent,
    SummaryComponent
  ],
  imports: [
    // ... other imports ...
    FormsModule
  ],
  // ...
}) 
export class AppModule { } 