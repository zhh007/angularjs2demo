import { RouterModule } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentTwoComponent} from './component-two/component-two.component';
import { Cmp1Component } from './cmp1/cmp1.component';

export const module1Routes=[
  {
		path:'',
		component:DefaultComponent,
    children: [
      { path: '', redirectTo: 'one', pathMatch: 'full' },
      { path: 'one', component: ComponentOneComponent },
      { path: 'two', component: ComponentTwoComponent },
      { path: 'list', component: Cmp1Component, outlet: 'sidebar' }
    ]
	}
];
