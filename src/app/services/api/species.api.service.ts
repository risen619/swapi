import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';

import { SpeciesModel } from 'src/app/models/species';

@Injectable({ providedIn: 'root' })
export class SpeciesApiService
{
	constructor(private api: ApiService) { }

	getSpecies(id: string): Observable<SpeciesModel>
	{
		return this.api.get(`species/${id}/`);
	}
}
