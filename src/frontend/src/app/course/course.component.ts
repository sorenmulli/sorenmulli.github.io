import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { ICourse, ICourses } from "./course";
import { CourseService } from './course.service';
import { IData, ILayout } from "../plotly/plotly";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseInfoComponent implements OnInit {

  courseSearchForm: FormGroup;
  searchResults: {[key: string]: ICourse};
  showAll: boolean = false;
  showCourseDescription: boolean = false;
  showStudieplan: boolean = false;

  constructor(public courseService: CourseService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // TODO: Kom med søgeforslag, hvis kurset ikke findes
    this.courseService.loadData();
    this.courseSearchForm = new FormGroup({
      searchBar: new FormControl(sessionStorage.getItem("queue"))
    });
    this.searchResults = this.courseService.courses;

    this.router.onSameUrlNavigation = "reload";
    this.route.params.subscribe(params => {
      this.courseService.set(params.id);
    })
  }

  setTopCourse() {
    // Tager kurset øverst i søgningen
    const courseNo = Object.keys(this.searchResults)[0];
    // Sikrer, at siden genindlæses, selv hvis kurset, og dermed url'en, er den samme
    this.router.navigate([""]).then(
      () => this.router.navigate(["course", courseNo])
    );
  }

  updateSearchResults(queue: string, change: string) {
    sessionStorage.setItem("queue", queue);
    queue = queue.toLowerCase();
    this.courseService.set(null);
    this.searchResults = this.courseService.search(queue, /^[0-9]+$/.test(queue))
  }

}
