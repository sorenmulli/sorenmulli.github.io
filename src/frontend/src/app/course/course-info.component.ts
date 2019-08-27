import { Component, OnInit, Input } from '@angular/core';

import { ICourse } from './course';

@Component({
  selector: 'course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  showCourseDescription: boolean = false;
  showStudieplan: boolean = false;

  @Input() course: any = {};

  constructor() { }

  ngOnInit() {
    console.log(this.course);
  }

}
