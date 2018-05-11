import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd'; 

@Component({
  selector: 'app-bill-total',
  templateUrl: './bill-total.component.html',
  styleUrls: ['./bill-total.component.css']
})
export class BillTotalComponent implements OnInit {

  query:object;
  
  data;
  addInfo;
  constructor(private http: HttpClient,private _message: NzMessageService) {
    
    this.data = [{id: "01000000003", name: "hqh2", settled: "0", unsettled: "0", total: "0", type: "销货单"}];
    this.query = {
      name:"",
      type:null
    }
    this.addInfo = {
      name:"",
      type:'销货单'
    }
  }
  resetForm(){
    this.query = {
      name:"",
      type:null
    }
  }
  getData(){
    this.http.post('./api/billTotal/list',this.query)
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
  }

  ngOnInit() {
    //this.getData();
  }

  // 模态框相关
  isVisible = false;
  isConfirmLoading = false;
  showModal = () => {
    this.isVisible = true;
  };
  handleOk = (e) => {
    this.isConfirmLoading = true;
    this.http.post('./api/billTotal/add',this.addInfo)
    .subscribe(res => {
      if(res['code'] == 0){
        this.isConfirmLoading = false;
        this.isVisible = false;
        this.createMessage('success','新增成功');
        this.getData();
      }else{
        this.isConfirmLoading = false;
        this.createMessage('error','系统异常');
      }
    })
  };

  createMessage = (type,msg) => {
    this._message.create(type,msg);
  };

  handleCancel = (e) => {
    this.isVisible = false;
  };

}
