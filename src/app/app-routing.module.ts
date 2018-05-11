import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BillTotalComponent } from "./components/bill-total/bill-total.component";
import { BillListComponent } from "./components/bill-list/bill-list.component";
import { DetailComponent } from "./components/detail/detail.component";
import { BillAddComponent } from "./components/bill-add/bill-add.component";

const routes: Routes = [
    {path:"",component:BillTotalComponent},
    {path:"total",component:BillTotalComponent},
    {path:"list",component:BillListComponent},
    {path:"detail",component:DetailComponent},
    {path:"add",component:BillAddComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}