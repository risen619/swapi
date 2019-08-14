import { Component } from '@angular/core';
import { CharacterFacade } from './store/facades/character';

@Component({
	selector: 'app-root',
	template: `<router-outlet></router-outlet>`,
	styles: []
})
export class AppComponent
{
	constructor(charactersFacade: CharacterFacade)
	{
		charactersFacade.requestCharacters();
	}
}
