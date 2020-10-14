import { Component } from '@angular/core';
import { CareerAspirationStatusTypeEnum, CxGanttChartModel, CxGanttTaskModel } from './cx-gantt-chart/models/gantttask.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  chartData: CxGanttChartModel;
  constructor() {
    const tasks: CxGanttTaskModel[] = [];
    tasks.push(new CxGanttTaskModel({
      title: 'Designer teacher',
      status: CareerAspirationStatusTypeEnum.CompletedGoal,
      startDate: new Date('1/1/2014'),
      endDate: new Date('1/1/2016')
    }));
    tasks.push(new CxGanttTaskModel({
      title: 'Tester teacher',
      status: CareerAspirationStatusTypeEnum.ChangedGoal,
      startDate: new Date('1/1/2015'),
      endDate: new Date('1/1/2017')
    }));
    tasks.push(new CxGanttTaskModel({
      title: 'Dev teacher',
      status: CareerAspirationStatusTypeEnum.CurrentGoal,
      startDate: new Date('1/1/2016'),
      endDate: new Date('1/1/2020')
    }));

    this.chartData = new CxGanttChartModel();
    this.chartData.tasks = tasks;
    this.chartData.minYear = 2014;
    this.chartData.maxYear = 2020;
  }

}
