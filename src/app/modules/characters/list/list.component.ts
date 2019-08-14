import { Component } from '@angular/core';

import { CharacterFacade } from 'src/app/store/facades/character';
import { Character } from 'src/app/models/character';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent
{
	private subs: Subscription[] = [];

	private models: Character[] = [];

	constructor(private charactersFacade: CharacterFacade)
	{
		this.subs.push(
			this.charactersFacade.characters.subscribe(c =>
			{
				this.models = Object.values(c);
			})
		);
	}

	ngOnDestroy()
	{
		this.subs.forEach(s => s.unsubscribe());
	}
}
