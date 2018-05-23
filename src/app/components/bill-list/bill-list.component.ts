import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageInfoService } from '../../services/page-info.service';
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  query: object;
  faId;
  data;

  constructor(private http: HttpClient, public PageInfoService: PageInfoService, private modalService: NzModalService, private _message: NzMessageService) {
    this.faId = this.PageInfoService.curTotalId;
    this.data = [];
    this.query = {
      rela_t_id: this.faId,
      name: "",
      description: "",
      dateFrom: null,
      dateTo: null,
      tel: "",
      status: null
    }
  }

  resetForm() {
    this.query = {
      rela_t_id: this.faId,
      name: "",
      description: "",
      dateFrom: null,
      dateTo: null,
      tel: "",
      status: null
    }
  }


  unsettled = 0;
  unsettledSum = 0;
  getData() {
    this.http.post('./api/billList/list', this.query)
      .subscribe(res => {
        this.data = res;
        this.unsettled = 0;
        this.unsettledSum = 0;
        this.data.forEach(data => {
          if (data.status == '未结算') {
            this.unsettled++;
            this.unsettledSum += Number(data.amount);
          }
        });
      });
  }

  ngOnInit() {
    this.getData();
  }

  setPageInfo(id) {
    this.PageInfoService.setCurListId(id);
  }

  _allChecked = false;
  _indeterminate = false;

  _refreshStatus() {
    const allChecked = this.data.every(value => value.checked === true);
    const allUnChecked = this.data.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  _checkAll(value) {
    if (value) {
      this.data.forEach(data => {
        if (data.status == '未结算') {
          data.checked = true;
        }
      });
    } else {
      this.data.forEach(data => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  }

  // 模态框相关
  isVisible = false;
  selectedIds: String[];

  showConfirm = () => {
    this.selectedIds = [];
    let amount = 0;
    for (let i in this.data) {
      if (this.data[i].checked) {
        this.selectedIds.push(this.data[i].id)
        amount += Number(this.data[i].amount)
      }
    }
    var that = this;
    this.modalService.confirm({
      title: '是否确认结算',
      content: '<b>共选中' + this.selectedIds.length + '条账单记录，共计金额' + amount + '</b>',
      onOk() {
        return new Promise((resolve) => {
          that.http.post('./api/billList/changeStatus', { ids: that.selectedIds, faId: that.faId })
            .subscribe(res => {
              if (res['code'] == 0) {
                that.createMessage('success', '结算成功');
                that.getData();
                that._allChecked = false;
              } else {
                that.createMessage('error', '系统异常');
              }
              resolve();
            })
        });

      },
      onCancel() {
      }
    });
  };

  createMessage = (type, msg) => {
    this._message.create(type, msg);
  };
}
