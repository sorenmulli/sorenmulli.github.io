import { Injectable, OnInit, OnDestroy } from '@angular/core';

import { ICourse, ICourses } from "./course";
import data from "../../assets/complete_raw_data.json";

@Injectable({
  providedIn: 'root'
})
export class CourseService implements OnDestroy {

  updateTime: Date;
  courses: ICourse[];

  constructor() { }

  ngOnDestroy() {
    this.courses = null;
  }

  loadData() {
    this.updateTime = new Date(data.updateTime);
    this.courses = data.courses;
  }

  search(queue: string, useCourseNo: boolean) {

  }
}
