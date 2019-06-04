import * as d3 from 'd3';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  @Input() data: [];

  ngOnInit() {
  }


}