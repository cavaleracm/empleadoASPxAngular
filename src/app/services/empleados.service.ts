import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IEmpleado } from '../interfaces/empleado';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private _endPoint: string = environment.endPoint;
  private _apiUrl: string = this._endPoint + 'Empleados/';

  constructor(private http: HttpClient) {}

  private empleadoCreadoSource = new Subject<void>();
  empleadoCreado$ = this.empleadoCreadoSource.asObservable();

  // Obtener lista de empleados
  getList(): Observable<IEmpleado[]> {
    return this.http.get<IEmpleado[]>(`${this._apiUrl}GetAll`);
  }

  // Agregar un nuevo empleado
  add(request: Omit<IEmpleado, 'id'>): Observable<IEmpleado> {
    return this.http.post<IEmpleado>(`${this._apiUrl}Add`, request);
  }

  // Eliminar empleado
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this._apiUrl}Delete/${id}`);
  }

   notificarEmpleadoCreado() {
    this.empleadoCreadoSource.next();
  }
  
}
