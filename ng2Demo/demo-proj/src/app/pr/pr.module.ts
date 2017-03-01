import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap';
import { PaginationModule } from 'ng2-bootstrap';

import { PrlistComponent } from './prlist/prlist.component';

import { PRService } from './pr.service';

import { prRoutes } from './pr.routes';
import { PrAddComponent } from './pr-add/pr-add.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    RouterModule.forChild(prRoutes),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot()
  ],
  declarations: [PrlistComponent, PrAddComponent],
  providers: [
    PRService
  ]
})
export class PRModule { }
