import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

export const appRoutes=[
	{
		path:'',
		redirectTo:'pr',
		pathMatch:'full'
	},{
		path:'pr',
		loadChildren:'./pr/pr.module#PRModule'
	}
];
