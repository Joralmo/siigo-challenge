import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { environment } from '@env/environment';
import { Client } from '@core/models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService extends ApiService {
  /**
   * Método para obtener todos los clientes
   */
  public getAll(): Observable<any> {
    return this.get(`${environment.siigoApi}/customers`);
  }

  /**
   * Método para crear un cliente.
   */
  public create(data: Client): Observable<any> {
    return this.post(`${environment.siigoApi}/customers`, data);
  }

  /**
   * Método para actualizar un cliente.
   */
  public update(data: Client): Observable<any> {
    return this.put(`${environment.siigoApi}/customers/${data.id}`, data);
  }

  /**
   * Método para eliminar un cliente.
   */
  public remove(id: string): Observable<any> {
    return this.delete(`${environment.siigoApi}/customers/${id}`);
  }

  /**
   * Método para obtener un cliente por su id.
   */
  public findByID(id: string): Observable<any> {
    return this.get(`${environment.siigoApi}/customers/${id}`);
  }
}
