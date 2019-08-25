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
    this.courseNos = Object.keys(this.courses);
    for (let courseNo of this.courseNos) {
      this.courseNames.push(this.courses[courseNo].info.name.toLowerCase());
    }
  }

  search(queue: string, useCourseNo: boolean): {[key: string]: ICourse} {
    const searchables = useCourseNo ? this.courseNos : this.courseNames;
    let matches: {[key: string]: ICourse} = {};
    for (let i in searchables) {
      if (searchables[i].indexOf(queue) >= 0) {
        matches[this.courseNos[i]] = this.courses[this.courseNos[i]];
      }
    }
    return matches
  }

  getNFirst(object: {[key: string]: ICourse}, n=10): {[key: string]: ICourse} {
    let i = 0;
    let newObject = {};
    for(let key of Object.keys(object)) {
      newObject[key] = object[key];
      i ++;
      if (i >= n) {
        break;
      }
    }
    return newObject
  }
}
