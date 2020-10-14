export class CxGanttTaskModel {
  color: string;
  title: string;
  status?: string;
  statusIcon?: string;
  indicatorColor: string;
  startDate: Date;
  endDate: Date;
  constructor(dto: CareerAspirationItemDto) {
    if (!dto) { return; }
    this.title = dto.title;
    this.startDate = dto.startDate;
    this.endDate = dto.endDate;
    this.processStatus(dto.status);
  }
  
  private processStatus(statusType: CareerAspirationStatusTypeEnum): void {
    if (statusType === null) { return; }

    const statusStyleScheme: CareerAspirationStatusDataScheme = Constant.CareerAspirationStatusMapper[statusType];

    if (!statusStyleScheme) { return; }

    this.color = statusStyleScheme.color;
    this.status = statusStyleScheme.text;
    this.statusIcon = statusStyleScheme.icon;
    this.indicatorColor = statusStyleScheme.highlightColor;
  }
}

export class CxGanttTaskRenderModel {
  data: CxGanttTaskModel;
  offset: number = 0; // px
  width: number = 0; // px

  constructor(data: CxGanttTaskModel, minYear: number, yearStep: number) {
    this.data = data;
    this.processData(data, minYear, yearStep);
  }

  private processData(data: CxGanttTaskModel, minYear: number, yearStep: number) {
    const monthStep = yearStep / 12;
    // Calculate task item width
    this.width = this.calculateWidthBetweenTwoDate(data.startDate, data.endDate, yearStep);
    
    // Calculate task item offset width
    const minStartDate = new Date(minYear, 1, 1);
    const offsetCalculated = this.calculateWidthBetweenTwoDate(minStartDate, data.startDate, yearStep);
    this.offset = offsetCalculated <= 0 ? 0 : offsetCalculated + monthStep;
  }

  private calculateWidthBetweenTwoDate(d1: Date, d2: Date, widthStep: number): number {
    const numberOfMonths = this.monthCounter(d1, d2);
    const numberOfMonthsInAYear = 12;
    const numberOfYears = numberOfMonths / numberOfMonthsInAYear;
    return numberOfYears * widthStep;
  }

  private monthCounter(d1: Date, d2: Date) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
}

export class CareerAspirationStatusDataScheme {
  color: string;
  text: string;
  icon: string;
  highlightColor: string;
}

export class CxGanttChartModel {
  tasks: CxGanttTaskModel[];
  minYear: number;
  maxYear: number;
}

export class CareerAspirationItemDto {
  title: string;
  status: CareerAspirationStatusTypeEnum;
  startDate: Date;
  endDate: Date;
}

export enum CareerAspirationStatusTypeEnum {
  CurrentGoal,
  ChangedGoal,
  CompletedGoal
}

export class Constant {
  static readonly CareerAspirationStatusMapper = {
    [CareerAspirationStatusTypeEnum.ChangedGoal]: {
      color: '#FF9E9E',
      text: 'Goal was changed',
      icon: '0',
      highlightColor: '#676695'
    },
    [CareerAspirationStatusTypeEnum.CurrentGoal]: {
      color: '#8799BA',
      text: 'Current goal',
      icon: '0',
      highlightColor: '#1D91CF'
    },
    [CareerAspirationStatusTypeEnum.CompletedGoal]: {
      color: '#7BDEAA',
      text: 'Goal achieved',
      icon: '0',
      highlightColor: '#8583FF'
    },
  }
}