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
  searchResults: ICourse[];
  showStudieplan: boolean = true;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    // TODO: Kom med søgeforslag, hvis kurset ikke findes
    this.courseSearchForm = new FormGroup({
      searchBar: new FormControl(null, Validators.required)
    });
    this.courseService.loadData();
    this.searchResults = this.courseService.courseData.courses;
    // this.searchResults = [this.courseService.courses["01003"], this.courseService.courses["01005"], this.courseService.courses["01015"]]
  }

  getCourse(courseNo: string) {
    this.currentCourse = this.courseService.courseData.courses[0];
    const studieplan = document.getElementById("studieplan");
    // studieplan.style

  }

  getTopCourse() {
    // Tager kurset øverst i søgningen
    
  }

  updateSearchResults(input: string) {
    this.currentCourse = null;
    // console.log(input);
    // const queue = this.courseSearchForm.get("searchBar").value;
    // this.isSearching = true;
    // // Afgør, om der søges på nummer eller navn
    // if (/^[0-9]+$/.test(queue)) {
    //   this.searchResults = this.courseService.searchNo(queue)
    // }
  }

}
