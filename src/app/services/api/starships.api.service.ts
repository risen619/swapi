import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';

import { StarshipModel } from 'src/app/models/starship';

@Injectable({ providedIn: 'root' })
export class StarshipsApiService
{
	constructor(private api: ApiService) { }

	getStarship(id: string): Observable<StarshipModel>
	{
		return this.api.get(`starships/${id}/`);
	}
}
