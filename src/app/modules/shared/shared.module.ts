import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule, MatOptionModule, MatToolbarModule, MatListModule, MatDividerModule, MatExpansionModule, MatSliderModule, MatCardModule } from '@angular/material';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,

		/* Material */
		MatSelectModule,
		MatOptionModule,
		MatToolbarModule
	],
	exports: [
		MatSelectModule,
		MatOptionModule,
		MatToolbarModule,
		MatListModule,
		MatDividerModule,
		MatExpansionModule,
		MatSliderModule,
		MatCardModule
	]
})
export class SharedModule { }
