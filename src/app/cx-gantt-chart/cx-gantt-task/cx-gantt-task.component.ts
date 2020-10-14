import { Component, OnInit, Input, Output } from '@angular/core';
import { CxGanttTaskModel } from '../models/gantttask.model';

@Component({
  selector: 'cx-gantt-task',
  templateUrl: './cx-gantt-task.component.html',
  styleUrls: ['./cx-gantt-task.component.scss']
})
export class CxGanttTaskComponent implements OnInit {
  @Input() set data(value: CxGanttTaskModel) {
    this.taskData = value;
  }
  taskData: CxGanttTaskModel;

  constructor() { }

  ngOnInit() {
  }
}

