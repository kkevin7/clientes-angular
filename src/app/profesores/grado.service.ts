import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Grado } from './grado';
import {Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GradoService {
  private urlEndPoint: string = 'http://localhost:8080/api/grados';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getGrados(): Observable<Grado[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Grado[])
    );
  }

  create(grado: Grado) : Observable<any>{
    return this.http.post<Grado>(this.urlEndPoint, grado, {headers: this.httpHeaders} ).pipe(
      map((response: any) => response.grado as Grado),
      catchError(e => {
        this.router.navigate(['/grados']);
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error,
        });
        return throwError(e);
      })
    )
  }

  getGrado(id): Observable<Grado>{
    return this.http.get<Grado>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/grados']);
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error,
        });
        return throwError(e);
      })
    );
  }

  update(grado: Grado): Observable<any>{
    return this.http.put(`${this.urlEndPoint}/${grado.id}`, grado, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.grado as Grado),
      catchError(e => {
        this.router.navigate(['/grados']);
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje,
          text: e.error.error,
        });
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Grado>{
    return this.http.delete<Grado>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/grados']);
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.error.mensaje,
        });
        return throwError(e);
      })
    );
  }

}
