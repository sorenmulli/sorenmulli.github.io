import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseInfoComponent } from './course-info/course-info.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { OverviewComponent } from './overview/overview.component';


const routes: Routes = [
  {path: "", redirectTo: "course/01005", pathMatch: "full"},
  {path: "course/:id", component: CourseInfoComponent},
  {path: "statistics", component: StatisticsComponent},
  {path: "overview", component: OverviewComponent},
  {path: "**", component: CourseInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
