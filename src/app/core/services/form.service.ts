import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})

export class FormService {

  constructor(private http:HttpClient) { }

/*   sowSeedInGarden(fieldPlantingData: object){
    return this.http.post<>(`${environment.apiUrl}/`, fieldPlantingData)
  }

  getFieldGarden(page: number): Observable<Game[]>{
    return this.http.get<>(`${environment.apiUrl}/games?page=${page}`)
  } */


}
