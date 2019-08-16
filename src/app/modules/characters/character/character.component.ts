import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Character } from 'src/app/models/character';

import { CharacterFacade } from 'src/app/store/facades/character';
import { FilmFacade } from 'src/app/store/facades/film';
import { SpeciesFacade } from 'src/app/store/facades/species';

import { Film } from 'src/app/models/film';
import { Species } from 'src/app/models/species';
import { Starship } from 'src/app/models/starship';
import { StarshipFacade } from 'src/app/store/facades/starship';

@Component({
	selector: 'app-character',
	templateUrl: './character.component.html',
	styleUrls: ['./character.component.scss']
})
export class CharacterComponent
{
	private subs: Subscription[] = [];

	private model: Character = null;
	private _films: Film[] = [];
	private _species: Species[] = [];
	private _starships: Starship[] = [];
	private id: string = null;

	constructor(
		route: ActivatedRoute,
		private charactersFacade: CharacterFacade,
		private filmsFacade: FilmFacade,
		private speciesFacade: SpeciesFacade,
		private starshipsFacade: StarshipFacade
	)
	{
		this.subs.push(
			route.paramMap.subscribe(p =>
			{
				this.id = p.get('id');
				this.subs.push(
					this.charactersFacade.getCharacter(this.id).pipe(filter(c => !!c)).subscribe(c =>
					{
						this.model = c;
					})
				);
			})
		);

		this.subs.push(this.filmsFacade.films.subscribe(f => this._films = Object.values(f)));
		this.subs.push(this.speciesFacade.species.subscribe(s => this._species = Object.values(s)));
		this.subs.push(this.starshipsFacade.starships.subscribe(s => this._starships = Object.values(s)));
	}

	ngOnDestroy()
	{
		this.subs.forEach(s => s.unsubscribe());
	}

	get movies()
	{
		return this._films.filter(f => this.model.films.includes(f.url)).map(f => f.title).join(', ');
	}

	get species()
	{
		return this._species.filter(s => this.model.species.includes(s.url)).map(s => s.name).join(', ');
	}

	get starships()
	{
		return this._starships.filter(s => this.model.starships.includes(s.url)).map(s => s.name).join(', ');
	}
}
