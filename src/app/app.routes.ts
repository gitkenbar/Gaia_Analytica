import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    loadComponent: ()=> import("./features/main/main.component").then((c) => c.MainComponent)
  },
  {
    path: 'field',
    loadComponent: ()=> import("./features/field/field.component").then((c) => c.FieldComponent)
  },
  {
    path: 'greenhouse',
    loadComponent: ()=> import("./features/greenhouse/greenhouse.component").then((c) => c.GreenhouseComponent)
  },
  {
    path: 'deals',
    loadComponent: ()=> import("./features/deals/deals.component").then((c) => c.DealsComponent)
  },
  {
    path: 'shop',
    loadComponent: ()=> import("./features/shop/shop.component").then((c) => c.ShopComponent)
  },
  {
    path: 'analytics',
    loadComponent: ()=> import("./features/analytics/analytics.component").then((c) => c.AnalyticsComponent)
  },
];
