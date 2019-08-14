import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, throwError, zip, interval } from 'rxjs';
import { take, mergeMap, tap, flatMap, map, filter } from 'rxjs/operators';

import { Character } from 'src/app/models/character';

import { CharacterFacade } from 'src/app/store/facades/character';
import { Film } from 'src/app/models/film';
import { FilmFacade } from 'src/app/store/facades/film';

@Component({
	selector: 'app-character',
	templateUrl: './character.component.html',
	styleUrls: ['./character.component.scss']
})
export class CharacterComponent
{
	private subs: Subscription[] = [];

	private model: Character = null;
	private films: Film[] = [];
	private id: string = null;

	constructor(route: ActivatedRoute, private charactersFacade: CharacterFacade, private filmsFacade: FilmFacade)
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

		this.subs.push(this.filmsFacade.films.subscribe(f => this.films = Object.values(f)));
	}

	ngOnDestroy()
	{
		this.subs.forEach(s => s.unsubscribe());
	}

	get movies()
	{
		return this.films.filter(f => this.model.films.includes(f.url)).map(f => f.title).join(', ');
	}
}
