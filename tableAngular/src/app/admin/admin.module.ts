import { OrderService } from './order.service';
import { ProductService } from './product.service';
import { AuthGuard } from "./auth.guard";
import { HttpModule } from "@angular/http";
import { AuthService } from "./auth.service";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthComponent } from "./auth/auth.component";
import { AdminComponent } from "./admin/admin.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from "./product/product-edit/product-edit.component";
import { OrderTableComponent } from './order-table/order-table.component';
 

let routing = RouterModule.forChild([
  { path: "auth", component: AuthComponent },
  // { path: "product", component: ProductComponent },
  { path: "main", component: AdminComponent, canActivate: [AuthGuard],
  children: [ 
    {path: 'products', component: ProductComponent},
    {path: 'products/:mode', component: ProductEditComponent},
    {path: 'products/:mode/:id', component: ProductEditComponent},
    {path: 'orders', component: OrderTableComponent},
  ]},

  { path: "**", redirectTo: "auth" }
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing, HttpModule],
  declarations: [AdminComponent, AuthComponent, ProductComponent, ProductEditComponent, OrderTableComponent ],
  providers: [AuthService, AuthGuard, ProductService, OrderService]
})
export class AdminModule {}
