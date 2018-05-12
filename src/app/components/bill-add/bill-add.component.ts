import { Component, OnInit } from '@angular/core';
import { PageInfoService } from '../../services/page-info.service';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd'; 

@Component({
  selector: 'app-bill-add',
  templateUrl: './bill-add.component.html',
  styleUrls: ['./bill-add.component.css']
})
export class BillAddComponent implements OnInit {
  
  addInfo = {
    name:"",
    type:"",
    tel:"",
    rela_t_id:this.PageInfoService.curTotalId,
    date: +new Date(),
    desc:"",
    amount:null,
    detailList:[]
  };
  data=[];
  detailInfo;
  faId;
  goodsAmount = 0;
  constructor(public PageInfoService: PageInfoService,public http: HttpClient,private _message:NzMessageService) {
  }
  ngOnInit() {
    this.faId = this.PageInfoService.curListId
    this.detailInfo = {
      product_name:"",
      model_name:"",
      number:null,
      unit:null
    }
    this.data = [];
    var that = this;
    this.http.post('./api/billTotal/select',{id:this.PageInfoService.curTotalId})
    .subscribe(res => {
      console.log(this)
      that.addInfo = {
        name:res['name'],
        type:res['type'],
        tel:"",
        rela_t_id:this.PageInfoService.curTotalId,
        date: +new Date(),
        desc:"",
        amount:null,
        detailList:[]
      }
    })
  }


  // 模态框相关
  isVisible = false;
  showModal = () => {
    this.isVisible = true;
  };
  handleOk = (e) => {
    this.isVisible = false;
    this.data.push({
      product_name:this.detailInfo.product_name,
      model_name:this.detailInfo.model_name,
      number:this.detailInfo.number,
      unit:this.detailInfo.unit,
      rela_l_id:this.faId
    })
    this.createMessage('success','新增成功');
    console.log(this.data)
    this.detailInfo = {
      product_name:"",
      model_name:"",
      number:null,
      unit:null
    }
  };

  createMessage = (type,msg) => {
    this._message.create(type,msg);
  };

  handleCancel = (e) => {
    this.isVisible = false;
    this.detailInfo = {
      product_name:"",
      model_name:"",
      number:null,
      unit:null
    }
  };

}
