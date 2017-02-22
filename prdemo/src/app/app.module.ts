import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { HeroFormComponent } from './hero-form.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  //如果组件、指令或管道出现在模块的imports数组中，不要把它声明在declarations数组中。 如果它是你自己写的，并且属于当前模块，就要把它声明在declarations数组中。
  declarations: [ AppComponent, HeroFormComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
