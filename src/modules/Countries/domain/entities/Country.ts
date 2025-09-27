import type { ICountryUI } from "./ICountryUI";

export class Country implements ICountryUI {
    private _name: string;
    private _capital: string;
    private _population: number;
    private _region: string;
    private _flag: string;

    constructor(name: string, capital: string, population: number, region: string, flag: string) {
        this._name = name;
        this._capital = capital;
        this._population = population;
        this._region = region;
        this._flag = flag;
    }

    get name(): string {
        return this._name;
    }

    get capital(): string {
        return this._capital;
    }

    get population(): number {
        return this._population;
    }

    get region(): string {
        return this._region;
    }

    get flag(): string {
        return this._flag;
    }
}