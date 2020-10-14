import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  CxGanttChartModel,
  CxGanttTaskRenderModel
} from "./models/gantttask.model";

@Component({
  selector: "cx-gantt-chart",
  templateUrl: "./cx-gantt-chart.component.html",
  styleUrls: ["./cx-gantt-chart.component.scss"]
})
export class CxGanttChartComponent implements OnInit, AfterViewInit {
  @Input() data: CxGanttChartModel;
  @ViewChild("cxGantChartViewer") cxGantChartViewer: ElementRef<HTMLElement>;
  @ViewChild("cxGanttChartTasksList") cxGanttChartTasksList: ElementRef<
    HTMLElement
  >;
  @ViewChild("cxGantChartScrollDiv") cxGantChartScrollDiv: ElementRef<
    HTMLElement
  >;
  @ViewChild("cxGanttChartTimeline", { read: ElementRef })
  cxGanttChartTimeline: ElementRef<HTMLElement>;

  taskRenderDataList: CxGanttTaskRenderModel[] = [];
  private yearStep: number = 409; // Width of a step of year, default 409px
  private currentYear: number = 0;
  private isDragging = false;
  constructor() {}

  ngOnInit() {
    this.initData();
    this.calculateYearStep();
    this.processTaskDataRender();
  }

  ngAfterViewInit(): void {
    this.setHeightForContentViewer();
  }

  onScroll(eventData) {
    const offsetValue = 10;

    this.cxGantChartScrollDiv.nativeElement.scrollLeft + offsetValue;
    const currentScrollLeft =
      this.cxGantChartScrollDiv.nativeElement.scrollLeft + offsetValue;
    const currentStep = currentScrollLeft / this.yearStep;
    const currentStepFloored = Math.floor(currentStep);
    const currentYear = this.data.minYear + currentStepFloored;
    if (this.isDragging) {
      this.currentYear = currentYear;
    }
    console.log(this.currentYear);
  }

  onMouseDown() {
    this.isDragging = true;
  }

  onMouseUp() {
    this.isDragging = false;
  }

  onPrev() {
    this.onChangeYear(this.currentYear - 1);
  }

  onNext() {
    this.onChangeYear(this.currentYear + 1);
  }

  get canPrev(): boolean {
    return this.currentYear > this.data.minYear;
  }

  get canNext(): boolean {
    return this.currentYear < this.data.maxYear;
  }

  private initData() {
    this.currentYear = this.data.minYear;
  }

  private onChangeYear(year: number) {
    this.currentYear = Math.min(
      Math.max(year, this.data.minYear),
      this.data.maxYear
    );
    this.updateScrollToCurrentYear();
    console.log(this.currentYear);
  }

  private updateScrollToCurrentYear() {
    const currentStep = this.currentYear - this.data.minYear;
    const scrollLeft = currentStep * this.yearStep;
    this.cxGantChartScrollDiv.nativeElement.scrollLeft = scrollLeft;
  }

  private setHeightForContentViewer(): void {
    if (!this.cxGantChartViewer || !this.cxGanttChartTasksList) {
      return;
    }

    const cxGantChartViewerElement = this.cxGantChartViewer.nativeElement;
    const cxGanttChartTasksListElement = this.cxGanttChartTasksList
      .nativeElement;
    const offsetHeight = 100; // px
    const contentHeight =
      cxGanttChartTasksListElement.offsetHeight + offsetHeight;

    if (contentHeight > 0) {
      cxGantChartViewerElement.style.height = contentHeight + "px";
    }
  }

  private calculateYearStep() {
    if (!this.cxGanttChartTimeline) {
      return;
    }

    const cxGanttChartTimelineElement = this.cxGanttChartTimeline.nativeElement;
    const firstYearElement = cxGanttChartTimelineElement.querySelector(
      ".cx-gantt-timeline-year-container"
    );
    if (firstYearElement) {
      this.yearStep = firstYearElement.clientWidth;
    }
  }

  private processTaskDataRender(): void {
    if (!this.data || !this.data.tasks || this.data.tasks.length <= 0) {
      console.error("Invalid data input for cx-gantt-chart");
      return;
    }

    this.taskRenderDataList = this.data.tasks.map(
      task => new CxGanttTaskRenderModel(task, this.data.minYear, this.yearStep)
    );
    console.log(this.taskRenderDataList);
  }
}
