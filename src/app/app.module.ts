import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';

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
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
