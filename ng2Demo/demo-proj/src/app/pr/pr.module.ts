import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap';
import { PaginationModule, ModalDirective } from 'ng2-bootstrap';




import { PRService } from './pr.service';

import { prRoutes } from './pr.routes';

import { PrlistComponent } from './prlist/prlist.component';
import { PrAddComponent } from './pr-add/pr-add.component';
import { PrItemAddComponent } from './pr-add/pritem-add.component'

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
  declarations: [
    PrlistComponent,
    PrAddComponent,
    PrItemAddComponent
  ],
  providers: [
    PRService
  ]
})
export class PRModule { }
