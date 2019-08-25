import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { ICourse, ICourses } from "../course/course";
import { CourseService } from '../course/course.service';
import { IData, ILayout } from "../plotly/plotly";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  courseSearchForm: FormGroup;
  currentCourse: ICourse | null = null;
  searchResults: {[key: string]: ICourse};
  showAll: boolean = false;
  showCourseDescription: boolean = false;
  showStudieplan: boolean = false;

  constructor(public courseService: CourseService) { }

  ngOnInit() {
    // TODO: Kom med søgeforslag, hvis kurset ikke findes
    this.courseService.loadData();
    this.courseSearchForm = new FormGroup({
      searchBar: new FormControl(null)
    });
    this.searchResults = this.courseService.courses;
  }

  getCourse(courseNo: string) {
    this.currentCourse = this.courseService.courses[courseNo];
  }

  getTopCourse() {
    // Tager kurset øverst i søgningen
    this.getCourse(Object.keys(this.searchResults)[0]);
  }

  updateSearchResults(queue: string, change: string) {
    queue = queue.toLowerCase();
    this.currentCourse = null;
    this.searchResults = this.courseService.search(queue, /^[0-9]+$/.test(queue))
    console.log(this.searchResults);
  }

}
