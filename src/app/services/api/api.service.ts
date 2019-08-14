import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService
{
	private baseUrl = 'https://swapi.co/api/';

	constructor(private http: HttpClient) { }

	get(endpoint: string, options?: any) : Observable<any>
	{
		return this.http.get(`${this.baseUrl}${endpoint}`, options);
	}
}
