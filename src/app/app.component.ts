import { Component } from '@angular/core';
import { CharacterFacade } from './store/facades/character';

@Component({
	selector: 'app-root',
	template: `
		<mat-toolbar color="primary">Star Wars Characters</mat-toolbar>
		<div>
			<router-outlet></router-outlet>
		</div>
	`,
	styleUrls: ['./app.component.scss']
})
export class AppComponent
{
	constructor(charactersFacade: CharacterFacade)
	{
		charactersFacade.requestCharacters();
	}
}
