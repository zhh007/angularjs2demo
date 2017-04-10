import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentTwoComponent } from './component-two/component-two.component';
import { module1Routes } from './module1.routes';
import { Cmp1Component } from './cmp1/cmp1.component';
import { DefaultComponent } from './default/default.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(module1Routes)
  ],
  declarations: [ComponentOneComponent, ComponentTwoComponent, Cmp1Component, DefaultComponent]
})
export class Module1Module { }
