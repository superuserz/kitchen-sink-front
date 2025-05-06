import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class ReportService {
    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
  
    download(): Observable<any> {
      return this.http.get(this.apiUrl + "/api/members/export", {
        responseType: 'blob',
        withCredentials: true,
      },).pipe(
        map((res) => {
          return {
            filename: `Report.xlsx`,
            data: res
          };
        }));
    }
  }