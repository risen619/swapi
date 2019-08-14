import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, throwError, zip, interval } from 'rxjs';
import { take, mergeMap, tap, flatMap, map } from 'rxjs/operators';

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
	private films: { [key: string]: Film } = { };
	private id: string = null;

	constructor(route: ActivatedRoute, private charactersFacade: CharacterFacade, private filmsFacade: FilmFacade)
	{
		window['c'] = this;

		this.subs.push(
			route.paramMap.subscribe(p =>
			{
				this.id = p.get('id');
				this.subs.push(
					this.charactersFacade.getCharacter(this.id).subscribe(c =>
					{
						this.model = c;
						if(this.model && this.model.films)
						{
							this.model.films.forEach(url =>
							{
								const filmId = (url.match(/\/(\d+)\/?/) || [])[1];
								if(filmId == undefined) return;

								this.subs.push(this.filmsFacade.getFilm(filmId).subscribe(f =>
								{
									if(f)
										this.films[f.id] = f;
								}));
							})
						}
					})
				);
			})
		);
	}

	ngOnDestroy()
	{
		this.subs.forEach(s => s.unsubscribe());
	}

	get movies()
	{
		return Object.values(this.films).map(f => f.title).join(', ');
	}
}
