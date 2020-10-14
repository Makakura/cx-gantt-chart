import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CxGanttTimelineComponent } from './cx-gantt-timeline/cx-gantt-timeline.component';
import { CxGanttTaskComponent } from './cx-gantt-task/cx-gantt-task.component';
import { CxGanttChartComponent } from './cx-gantt-chart.component';
import { CxGanttScrubberComponent } from './cx-gantt-scrumbler/cx-gantt-scrubber.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CxGanttScrubberComponent, CxGanttTaskComponent, CxGanttTimelineComponent, CxGanttChartComponent],
  exports: [CxGanttScrubberComponent, CxGanttTaskComponent, CxGanttTimelineComponent, CxGanttChartComponent],
})
export class CxGanttScumblerModule { }