import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule, MatInputModule } from "@angular/material";

import { CourseInfoComponent } from './course-info/course-info.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { OverviewComponent } from './overview/overview.component';
import { DocsComponent } from './docs/docs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlotlyComponent } from './plotly/plotly.component';
import { CourseService } from './course/course.service';
import { KeysPipe } from './course-info/course-info.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CourseInfoComponent,
    StatisticsComponent,
    OverviewComponent,
    DocsComponent,
    PlotlyComponent,
    KeysPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
