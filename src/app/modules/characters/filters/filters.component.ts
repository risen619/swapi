import { Component, Output, EventEmitter } from '@angular/core';
import { FilmFacade } from 'src/app/store/facades/film';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/models/film';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Species } from 'src/app/models/species';
import { SpeciesFacade } from 'src/app/store/facades/species';

@Component({
	selector: 'filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})
export class FiltersComponent
{
	@Output() filtersChange = new EventEmitter<Filters>();

	private sub: Subscription = new Subscription();
	
	form: FormGroup;
	films: Film[] = [];
	species: Species[] = [];

	constructor(fb: FormBuilder, private filmsFacade: FilmFacade, private speciesFacade: SpeciesFacade)
	{
		this.sub.add(this.filmsFacade.films.subscribe(f => this.films = Object.values(f)));
		this.sub.add(this.speciesFacade.species.subscribe(s => this.species = Object.values(s)));

		this.form = fb.group({
			film: [''],
			species: [''],
			birthFrom: [-100],
			birthTo: [100]
		});

		this.sub.add(this.form.valueChanges.subscribe(() => this.filtersChange.emit(this.form.value)));
	}

	get birthFrom() { return this.form.get('birthFrom').value; }

	get birthTo() { return this.form.get('birthTo').value; }

	get birthFromMax() { return Math.min(this.birthTo, 100); }

	get birthToMin() { return Math.max(this.birthFrom, -100); }

	ngOnDestroy()
	{
		this.sub.unsubscribe();
	}

	formatBirth(value) { return `${Math.abs(value)}${value < 0 ? 'BBY' : 'ABY'}`; }
}

export interface Filters
{
	film: string;
	species: string;
	birthFrom: number;
	birthTo: number;
}