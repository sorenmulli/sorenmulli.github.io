import { Injectable, OnInit, OnDestroy } from '@angular/core';

import { ICourses } from "./course";
import data from "../../assets/complete_raw_data.json";

@Injectable({
  providedIn: 'root'
})
export class CourseService implements OnDestroy {

  courseData: ICourses;

  constructor() { }

  ngOnDestroy() {
    this.courseData = null;
  }

  loadData() {
    this.courseData = {
      updateTime: new Date(data.updateTime),
      courses: data.courses,
    }
  }

  searchNo(queue: string) {
    for (let no of Object.keys(this.courseData)) {
      console.log(no);
    }
    return this.courseData;
  }

  searchName(queue: string) {
    return this.courseData;
  }
}
