import { Component, OnInit } from '@angular/core';
import { PageInfoService } from '../../services/page-info.service';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd'; 
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
    description:"",
    amount:null
  };
  data=[];
  detailInfo;
  faId;
  goodsAmount = 0;
  constructor(public PageInfoService: PageInfoService,public http: HttpClient,private modalService: NzModalService,private _message:NzMessageService) {
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
      this.addInfo.name = res['name'];
      this.addInfo.tel = res['tel'];
      this.addInfo.type = res['type'];
      this.addInfo.rela_t_id = this.PageInfoService.curTotalId;
      this.addInfo.date = +new Date();
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
    this.getGoodsAmount(); 
    this.detailInfo = {
      product_name:"",
      model_name:"",
      number:null,
      unit:null
    }
  };

//confirm 确认删除
_allChecked = false;
  _indeterminate = false;

  _refreshStatus() {
    const allChecked = this.data.length == 0 ? false : this.data.every(value => value.checked === true);
    const allUnChecked = this.data.length == 0 ? true : this.data.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    
  }

  _checkAll(value) {
    if (value) {
      this.data.forEach(data => {
        data.checked = true;
      });
    } else {
      this.data.forEach(data => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  }
  showConfirm = () => {
    let selecteds =[];
    let str = "";
    for(let i=0;i < this.data.length;i++){
      if(this.data[i].checked){
        selecteds.push(i);
        str += this.data[i].product_name +","
      }
    }
    var that = this;
    this.modalService.confirm({
      title  : '是否确认删除',
      content: '<b>商品:' + str + '</b>',
      onOk() {
        for (let i = 0; i < selecteds.length; i++) {
          const element = selecteds[i];
          that.data.splice(element-i,1)
        }
        that._refreshStatus();
      },
      onCancel() {
      }
    });
  };


  getGoodsAmount(){
    let $amount = 0;
    for(let i in this.data){
      $amount += this.data[i].number * this.data[i].unit
    }
    this.goodsAmount = $amount;
  }

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

  submit(){
    let desc = "";
    for (let i = 0; i < this.data.length; i++) {
      const element = this.data[i];
      desc += element.product_name +"_"+element.model_name
    }
    this.addInfo.description = desc;
    this.http.post("./api/billList/add",{
      addInfo:this.addInfo,
      detail:this.data
    }).subscribe(res =>{
      if(res['code'] == 0){
        document.getElementById('goBack').click();

      }
    })
  }

}
