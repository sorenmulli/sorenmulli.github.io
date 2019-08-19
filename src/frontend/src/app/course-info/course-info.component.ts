import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { CourseInfo } from "./course-info";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  courseSearchForm: FormGroup;
  courseFound = false;
  courseInfo: CourseInfo;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // TODO: Kom med søgeforslag, hvis kurset ikke findes
    this.courseSearchForm = new FormGroup({
      searchBar: new FormControl(null, Validators.required)
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      this.courseSearchForm.get("searchBar").setValue(id);
      this.getCourse(id);
    })
  }

  navigateToCourse(courseNo: string) {
    this.router.navigateByUrl(`/course/${courseNo}`);
  }

  getCourse(courseNo: string) {
  }

}
