import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TarjetaCredito } from '../models/tarjetaCredito';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  appUrl = 'https://localhost:44352/';
  apiUrl = 'api/TarjetaCredito/';
  actualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any);

  constructor(
    private http: HttpClient
  ) { }

  obtenerTarjetas(): Observable<any> {
    return this.http.get(this.appUrl + this.apiUrl);
  }

  guardarTarjeta(tarjeta: TarjetaCredito): Observable<any> {
    return this.http.post(this.appUrl + this.apiUrl, tarjeta);
  }

  actualizarTarjeta(id: number, tarjeta: TarjetaCredito): Observable<any> {
    return this.http.put(this.appUrl + this.apiUrl + id, tarjeta);
  }

  eliminarTarjeta(id: number): Observable<any> {
    return this.http.delete(this.appUrl + this.apiUrl + id);
  }

  actualizar(tarjeta: TarjetaCredito) {
    this.actualizarFormulario.next(tarjeta);
  }

  obtenerTarjeta$(): Observable<TarjetaCredito> {
    return this.actualizarFormulario.asObservable();
  }

}
