import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageInfoService } from '../../services/page-info.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  query:object;
  faId;
  data;

  constructor(private http: HttpClient,public PageInfoService: PageInfoService) { 
    this.faId = this.PageInfoService.curTotalId;
    this.data = [];
    this.query = {
      rela_t_id:this.faId,
      name:"",
      desc:"",
      dateFrom:null,
      dateTo:null,
      tel:"",
      status:null
    }
  }

  resetForm(){
    this.query = {
      rela_t_id:this.faId,
      name:"",
      desc:"",
      dateFrom:null,
      dateTo:null,
      tel:"",
      status:null
    }
  }

  getData(){
    this.http.post('./api/billList/list',this.query)
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
  }

  ngOnInit() {
    this.getData();
  }

  setPageInfo(id){
    this.PageInfoService.setCurListId(id);
  }

}
