import { Component } from '@angular/core';

import { Subscription } from 'rxjs';

import { CharacterFacade } from 'src/app/store/facades/character';
import { Character } from 'src/app/models/character';

import { Filters } from '../filters/filters.component';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent
{
	private subs: Subscription[] = [];

	private filters: Filters = { film: '', species: '', birthFrom: -100, birthTo: 100 };
	private models: Character[] = [];
	
	filteredModels: Character[] = [];

	constructor(private charactersFacade: CharacterFacade)
	{
		this.subs.push(
			this.charactersFacade.characters.subscribe(c =>
			{
				this.models = Object.values(c);
				this.filterModels();
			})
		);
	}

	ngOnDestroy()
	{
		this.subs.forEach(s => s.unsubscribe());
	}

	filterModels()
	{
		this.filteredModels = this.models.filter(m =>
		{
			return (
				(!this.filters.film || this.filters.film && m.films.includes(this.filters.film)) &&
				(!this.filters.species || this.filters.species && m.species.includes(this.filters.species)) &&
				(m.bornBetween(this.filters.birthFrom, this.filters.birthTo))
			);
		});
	}

	onFiltersChange(e)
	{
		this.filters = e;
		this.filterModels();
	}
}
