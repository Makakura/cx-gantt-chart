import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cx-gantt-timeline',
  templateUrl: './cx-gantt-timeline.component.html',
  styleUrls: ['./cx-gantt-timeline.component.scss']
})
export class CxGanttTimelineComponent implements OnInit {
  @Input() minYear: number;
  @Input() maxYear: number;

  years: number[] = [];
  constructor() {}

  ngOnInit() {
    this.processYear();
  }

  private processYear() {
    if (this.minYear === null || this.maxYear === null || this.minYear <= 0 || this.minYear > this.maxYear) {
      console.error('Invalid input for cx-gantt-timeline');
      return;
    }

    for (let i = this.minYear; i <= this.maxYear; i++) {
      this.years.push(i);
    }
  }
}