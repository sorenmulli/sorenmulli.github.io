import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseInfoComponent } from './course-info/course-info.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { OverviewComponent } from './overview/overview.component';
import { DocsComponent } from './docs/docs.component';


const routes: Routes = [
  {path: "", redirectTo: "course", pathMatch: "full"},
  {path: "course/:id", component: CourseInfoComponent},
  {path: "statistics", component: StatisticsComponent},
  {path: "overview", component: OverviewComponent},
  {path: "docs", component: DocsComponent},
  {path: "**", component: CourseInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
