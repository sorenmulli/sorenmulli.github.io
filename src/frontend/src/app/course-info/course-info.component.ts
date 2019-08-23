import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Courses } from "../course/course";
import { IData, ILayout } from "../plotly/plotly";
import { CourseService } from '../course/course.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  courseSearchForm: FormGroup;
  isSearching = false;  // TODO: Bind op på change events

  data = [{
    x: [1,2,3],
    y: [1,2,4]
  }]
  layout = {
    xaxis: {
      title: "En bedre titel",
    }
  }

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    // TODO: Kom med søgeforslag, hvis kurset ikke findes
    this.courseSearchForm = new FormGroup({
      searchBar: new FormControl(null, Validators.required)
    });
    
  }

  getCourse(courseNo: string) {

  }

  getTopCourse() {
    // Tager kurset øverst i søgningen
    
  }

}
