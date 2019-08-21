import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import { IData, ILayout } from "./plotly";

declare var Plotly: any;

@Component({
  selector: 'plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.css']
})
export class PlotlyComponent implements OnInit {

  @Input() private data: IData[];
  @Input() private layout: ILayout;
  private dataDefaults: IData;
  private layoutDefaults: ILayout;

  @ViewChild("Graph", {static: true})
  private Graph: ElementRef;

  constructor() { }

  ngOnInit() {
    console.log(this.data);

    // Lægger defaults til modtaget data og layout
    for (let dat of this.data) {
      dat = {...this.dataDefaults, ...dat}
    }
    this.layout = {...this.layoutDefaults, ...this.layout};
    
    this.Graph = Plotly.newPlot( 
      this.Graph.nativeElement, 
      this.data, 
      this.layout,
      { 
        responsive: true,
        scrollZoom: true
      }
    );
  }

}
