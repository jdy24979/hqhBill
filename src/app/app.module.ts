import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AppComponent } from './app.component';

import { AppRoutingModule } from "./app-routing.module";
import { BillListComponent } from './components/bill-list/bill-list.component';
import { DetailComponent } from './components/detail/detail.component';
import { BillTotalComponent } from './components/bill-total/bill-total.component';


@NgModule({
  declarations: [
    AppComponent,
    BillListComponent,
    DetailComponent,
    BillTotalComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
