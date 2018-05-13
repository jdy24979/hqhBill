import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageInfoService } from '../../services/page-info.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {


  data =[];
  faId;
  goodsAmount=0;
  constructor(private http: HttpClient,public PageInfoService: PageInfoService) { 

  }

  ngOnInit() {
    this.faId = this.PageInfoService.curListId;
    this.http.post("./api/billDetail/list",{id:this.faId})
    .subscribe(res =>{
      if(res['code'] == 0){
        this.data = res['list'];
        let $amount = 0;
        for(let i in this.data){
          $amount += this.data[i].number * this.data[i].unit
        }
        this.goodsAmount = $amount;
      }
    })
  }

}
