import { Injectable, OnInit, OnDestroy } from '@angular/core';

import { ICourse, ICourses } from "./course";
import data from "../../assets/complete_raw_data.json";
import { match } from 'minimatch';

@Injectable({
  providedIn: 'root'
})
export class CourseService implements OnDestroy {

  time: Date;
  courses: {[key: string]: ICourse};
  courseNos: string[] = [];
  courseNames: string[] = [];

  constructor() { }

  ngOnDestroy() {
    this.courses = null;
  }

  loadData() {
    this.time = new Date(data.time);
    this.courses = data.courses;
    console.log(1);
    for (let courseNo of Object.keys(this.courses)) {
      this.courseNos.push(courseNo);
      this.courseNames.push(this.courses[courseNo].info.name.toLowerCase());
    }
  }

  search(queue: string, useCourseNo: boolean): ICourse[] {
    const searchables = useCourseNo ? this.courseNos : this.courseNames;
    let matches: string[] = [];
    for (let i in searchables) {
      console.log(searchables[i]);
      console.log(queue);
      if (searchables[i].startsWith(queue)) {
        matches.push(i);
      }
    }
    console.log(matches);
    return matches.map((val) => {return this.courses[val]})
  }
}
