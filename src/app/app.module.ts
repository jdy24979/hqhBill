import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { PageInfoService } from './services/page-info.service';
import { AppComponent } from './app.component';

import { AppRoutingModule } from "./app-routing.module";
import { BillListComponent } from './components/bill-list/bill-list.component';
import { DetailComponent } from './components/detail/detail.component';
import { BillTotalComponent } from './components/bill-total/bill-total.component';
import { BillAddComponent } from './components/bill-add/bill-add.component';


@NgModule({
  declarations: [
    AppComponent,
    BillListComponent,
    DetailComponent,
    BillTotalComponent,
    BillAddComponent
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
  providers: [PageInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
