import { Component, OnInit, Input } from '@angular/core';

import { ICourse } from './course';
import { getGrades, getEvals } from "./course.service";

// TODO: Locale


@Component({
  selector: 'course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  showCourseDescription: boolean = false;
  showStudieplan: boolean = false;

  getGrades = getGrades;
  getEvals = getEvals;

  @Input() course: ICourse;

  constructor() { }

  ngOnInit() {
  }

}
