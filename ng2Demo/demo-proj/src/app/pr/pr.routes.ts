import { RouterModule } from '@angular/router';

import { PrlistComponent } from './prlist/prlist.component';

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
	// { 
	// 	path: 'postdetail/:postId', 
	// 	component: PostDetailMainComponent 
	// }
];