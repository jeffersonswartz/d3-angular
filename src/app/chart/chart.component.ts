import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterContentInit {

  radius = 10;
  @Input() data: any;

  margin: any =  {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  };

  width: any = 600 - this.margin.left - this.margin.right;
  height: any = 600 - this.margin.top - this.margin.bottom;
  svg: any;

  x = d3.scaleBand().range([0, this.width]);
  y = d3.scaleLinear().range([this.height, 0]);

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {

    this.svg = d3.select('svg').attr('width', this.width).attr('height', this.height).append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.data.forEach(element => {
      element.Freq += element.Freq;
    });
    this.x.domain(this.data.map((d: any) => {
      return d.Letter;
    }));
    this.y.domain([0, d3.max(this.data, (d: any): number => d.Freq )]);

    this.svg.selectAll('.bar')
    .data(this.data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', (d: any) => this.x(d.Letter))
    .attr('y', (d: any) => this.y(d.Freq))
    .attr('width', this.x.bandwidth())
    .attr('height', (d: any) => this.height - this.y(d.Freq));

    this.svg.append('g').attr('transform', 'translate(0,' + this.height + ')').call(d3.axisBottom(this.x));

    this.svg.append('g').call(d3.axisLeft(this.y));
  }

  clicked(event: any) {
    d3.select(event.target)
    .append('circle')
    .attr('cx', event.x)
    .attr('cy', event.y)
    .attr('r', this.radius)
    .attr('fill', 'red');
  }
}
