import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

export const appRoutes=[
	{
		path:'',
		redirectTo:'module1',
		pathMatch:'full'
	},{
		path:'module1',
		loadChildren:'./module1/module1.module#Module1Module'
	}
];
