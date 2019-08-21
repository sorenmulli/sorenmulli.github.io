import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { CourseInfo } from "./course-info";
import { IData, ILayout } from "../plotly/plotly";

declare var Plotly: any;

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  courseSearchForm: FormGroup;
  courseFound = false;
  courseInfo: CourseInfo;

  data = [{
    x: [1,2,3],
    y: [1,2,4]
  }]
  layout = {
    // autoexpand: "true",
    // autosize: "true",
    // width: window.innerWidth - 200, //we give initial width, so if the
    //                                 //graph is rendered while hidden, it   
    //                                 //takes the right shape
    // margin: {
    //   autoexpand: "true",
    //   margin: 0
    // },
    // offset: 0,
    // type: "scattergl",
    // title: name, //Title of the graph
    // hovermode: "closest",
    // xaxis: {
    //   linecolor: "black",
    //   linewidth: 2,
    //   mirror: true,
    //   title: "Time (s)",
    //   automargin: true
    // },
    // yaxis: {
    //   linecolor: "black",
    //   linewidth: 2,
    //   mirror: true,
    //   automargin: true,
    //   title: 'Any other Unit'
    // }
  }

  @ViewChild("Graph", {static: true})
  private Graph: ElementRef;

  constructor() { }

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
