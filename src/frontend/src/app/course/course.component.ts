import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { ICourse } from "./course";
import { CourseService } from './course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courseSearchForm: FormGroup;
  searchResults: {[key: string]: ICourse};
  showAll: boolean = false;

  constructor(public courseService: CourseService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // TODO: Kom med søgeforslag, hvis kurset ikke findes
    this.courseService.loadData();
    this.courseSearchForm = new FormGroup({
      searchBar: new FormControl(sessionStorage.getItem("queue"))
    });
    this.searchResults = this.courseService.courses;

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
