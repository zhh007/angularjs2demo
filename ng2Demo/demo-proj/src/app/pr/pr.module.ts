import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AlertModule } from 'ng2-bootstrap';
import { PaginationModule } from 'ng2-bootstrap';

import { PrlistComponent } from './prlist/prlist.component';

import { PRService } from './pr.service';

import { prRoutes } from './pr.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(prRoutes),
    PaginationModule.forRoot(),
    AlertModule.forRoot()
  ],
  declarations: [PrlistComponent],
  providers: [
    PRService
  ]
})
export class PRModule { }
