import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class PrivatBankApiService {
    private baseApiUrl: string;

    constructor(private http: Http) {
        this.baseApiUrl = "https://api.privatbank.ua/p24api/";
    }

    getExchangeRates(isCaheRate: boolean = true): Observable<Object> {
        let coursid = isCaheRate ? 5 : 11;
        return this.http.get(this.getApiUrl(`pubinfo?json&exchange&coursid=${coursid}`))
            .map((response: Response) => {
                let data = response.json();
                return data;
            });
    }

    getExchangeRatesHistory(date: Date): Observable<Object> {
        //import moment from 'moment';
        let dateStr = ''; //moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
        console.warn(dateStr);
        return this.http.get(this.getApiUrl(`exchange_rates?json&date=${dateStr}`))
            .map((response: Response) => {
                let data = response.json();
                return data;
            });
    }

    private getApiUrl(url: string): string {
        return this.baseApiUrl + url;
    }
}