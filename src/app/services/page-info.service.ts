import { Injectable } from '@angular/core';

@Injectable()
export class PageInfoService {

  curTotalId:Number;
  curListId:Number;

  constructor() {
    this.curListId = null;
    this.curTotalId = null;
  }

  setCurTotalId(id){
    this.curTotalId = id;
  }

  setCurListId(id){
    this.curListId = id;
  }

}
