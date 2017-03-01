import { RouterModule } from '@angular/router';

import { PrlistComponent } from './prlist/prlist.component';
import {PrAddComponent} from './pr-add/pr-add.component'

export const prRoutes=[
  {
		path:'',
		redirectTo:'list/1',
		pathMatch:'full'
	},
	{
		path:'list/:page',
		component:PrlistComponent
	},
	{ 
		path: 'add', 
		component: PrAddComponent 
	}
];