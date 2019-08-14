import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { ListComponent } from './list/list.component';
import { CharacterComponent } from './character/character.component';
import { FiltersComponent } from './filters/filters.component';

const routes: Route[] = [
	{
		path: '',
		component: ListComponent
	},
	{
		path: ':id',
		component: CharacterComponent
	}
];

@NgModule({
	declarations: [
		ListComponent,
		CharacterComponent,
		FiltersComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class CharactersModule { }
