import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class InitialService {
  baseUrl: string;
  clientName: string;
  constructor() { }
}
