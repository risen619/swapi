import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { FilmModel } from 'src/app/models/film';

@Injectable({ providedIn: 'root' })
export class FilmsApiService
{
	constructor(private api: ApiService) { }

	getFilm(id: string): Observable<FilmModel>
	{
		return this.api.get(`films/${id}/`);
	}
}
