import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CxGanttScumblerModule } from './cx-gantt-chart/cx-gantt-chart.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, CxGanttScumblerModule ],
  declarations: [ AppComponent, HelloComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
