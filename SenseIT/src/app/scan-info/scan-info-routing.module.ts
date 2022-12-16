import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanInfoPage } from './scan-info.page';

const routes: Routes = [
  {
    path: '',
    component: ScanInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanInfoPageRoutingModule {}
