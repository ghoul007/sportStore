import { FormsModule } from '@angular/forms';
import { OrderService } from './order.service';
import { StoreFirstGuard } from './store-first.guard';
import { CanActivate, LoadChildren, RouterModule } from '@angular/router';
import { Cart } from "./model/cart";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ProductService } from "./product.service";
import { StoreComponent } from "./store/store.component";
import { CartSummaryComponent } from "./cart-summary/cart-summary.component";
import { CartDetailComponent } from "./cart-detail/cart-detail.component";
import { CheckoutComponent } from "./checkout/checkout.component";

const ROOT = [
  { path: "store", component: StoreComponent, canActivate: [StoreFirstGuard] },
  { path: "cart", component: CartDetailComponent, canActivate: [StoreFirstGuard] },
  { path: "checkout", component: CheckoutComponent, canActivate: [StoreFirstGuard] },
  { path: 'admin', loadChildren: "app/admin/admin.module#AdminModule" },
  { path: "**", redirectTo: "/store"}
];
@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    CartSummaryComponent,
    CartDetailComponent,
    CheckoutComponent
  ],
  imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(ROOT)],
  providers: [ProductService, Cart, StoreFirstGuard, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
