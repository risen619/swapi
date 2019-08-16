export interface CharacterModel
{
	birth_year: string;
	created: string;
	edited: string;
	eye_color: string;
	films: string[];
	gender: string;
	hair_color: string;
	height: string;
	homeworld: string;
	mass: string;
	name: string;
	skin_color: string;
	species: string[];
	starships: string[];
	url: string;
	vehicles: string[];
}

export class Character implements CharacterModel
{
	private _data: CharacterModel;
	private _id: string;

	constructor(data: CharacterModel)
	{
		this._data = data;
		this._id = (this.url.match(/\/(\d+)\/?/) || [])[1];
	}

	get data() { return this._data; }

	get birth_year() { return this._data.birth_year; }
	set birth_year(data: string) { this._data.birth_year = data; }
	
	get created() { return this._data.created; }
	set created(data: string) { this._data.created = data; }
	
	get edited() { return this._data.edited; }
	set edited(data: string) { this._data.edited = data; }
	
	get eye_color() { return this._data.eye_color; }
	set eye_color(data: string) { this._data.eye_color = data; }
	
	get films() { return this._data.films; }
	set films(data: string[]) { this._data.films = data; }
	
	get gender() { return this._data.gender; }
	set gender(data: string) { this._data.gender = data; }
	
	get hair_color() { return this._data.hair_color; }
	set hair_color(data: string) { this._data.hair_color = data; }
	
	get height() { return this._data.height; }
	set height(data: string) { this._data.height = data; }
	
	get homeworld() { return this._data.homeworld; }
	set homeworld(data: string) { this._data.homeworld = data; }
	
	get mass() { return this._data.mass; }
	set mass(data: string) { this._data.mass = data; }
	
	get name() { return this._data.name; }
	set name(data: string) { this._data.name = data; }
	
	get skin_color() { return this._data.skin_color; }
	set skin_color(data: string) { this._data.skin_color = data; }
	
	get species() { return this._data.species; }
	set species(data: string[]) { this._data.species = data; }
	
	get starships() { return this._data.starships; }
	set starships(data: string[]) { this._data.starships = data; }
	
	get url() { return this._data.url; }
	set url(data: string) { this._data.url = data; }
	
	get vehicles() { return this._data.vehicles; }
	set vehicles(data: string[]) { this._data.vehicles = data; }

	get id() { return this._id; }

	/* Helpers */

	bornBetween(from: number, to: number)
	{
		if(!/[\d\.]+\w+/.test(this.birth_year)) return true;

		const parts = this.birth_year.match(/([\d\.]+)(\w+)/);

		const year = parseFloat(parts[1] as string) * (parts[2] === 'BBY' ? -1 : 1);
		return from <= year && year <= to;
	}
}