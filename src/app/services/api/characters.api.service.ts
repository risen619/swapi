import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { CharacterModel } from 'src/app/models/character';

@Injectable({ providedIn: 'root' })
export class CharactersApiService
{
	constructor(private api: ApiService) { }

	getCharacters(): Observable<{ count: number, next: string, previous: string, results: CharacterModel[] }>
	{
		return this.api.get('people/');
	}

	getCharacter(id: string): Observable<CharacterModel>
	{
		return this.api.get(`people/${id}/`);
	}
}
