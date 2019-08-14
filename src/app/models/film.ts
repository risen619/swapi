export interface FilmModel
{
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
    url: string;
}

export class Film implements FilmModel
{
    private _data: FilmModel;
    private _id: string;

    constructor(data: FilmModel)
    {
        this._data = data;
        this._id = (this.url.match(/\/(\d+)\/?/) || [])[1];
    }

    get data() { return this._data; }

    get title() { return this._data.title; }
    set title(data: string) { this._data.title = data; }
    
    get episode_id() { return this._data.episode_id; }
    set episode_id(data: number) { this._data.episode_id = data; }
    
    get opening_crawl() { return this._data.opening_crawl; }
    set opening_crawl(data: string) { this._data.opening_crawl = data; }
    
    get director() { return this._data.director; }
    set director(data: string) { this._data.director = data; }
    
    get producer() { return this._data.producer; }
    set producer(data: string) { this._data.producer = data; }
    
    get release_date() { return this._data.release_date; }
    set release_date(data: string) { this._data.release_date = data; }
    
    get characters() { return this._data.characters; }
    set characters(data: string[]) { this._data.characters = data; }
    
    get planets() { return this._data.planets; }
    set planets(data: string[]) { this._data.planets = data; }
    
    get starships() { return this._data.starships; }
    set starships(data: string[]) { this._data.starships = data; }
    
    get vehicles() { return this._data.vehicles; }
    set vehicles(data: string[]) { this._data.vehicles = data; }
    
    get species() { return this._data.species; }
    set species(data: string[]) { this._data.species = data; }
    
    get created() { return this._data.created; }
    set created(data: string) { this._data.created = data; }
    
    get edited() { return this._data.edited; }
    set edited(data: string) { this._data.edited = data; }
    
    get url() { return this._data.url; }
    set url(data: string) { this._data.url = data; }
    
    get id() { return this._id; }
}