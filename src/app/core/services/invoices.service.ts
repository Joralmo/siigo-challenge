import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { environment } from '@env/environment';
import { Invoice } from '@core/models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService extends ApiService {
  /**
   * Método para obtener el listado de todas las facturas.
   */
  public getAll(): Observable<any> {
    return this.get(`${environment.siigoApi}/invoices`);
  }

  /**
   * Método para crear una factura.
   */
  public create(data: Invoice): Observable<any> {
    return this.post(`${environment.siigoApi}/invoices`, data);
  }

  /**
   * Método para actualizar una factura.
   */
  public update(data: Invoice): Observable<any> {
    return this.post(`${environment.siigoApi}/invoices/${data.id}`, data);
  }

  /**
   * Método para eliminar una factura.
   */
  public remove(id: string): Observable<any> {
    return this.delete(`${environment.siigoApi}/invoices/${id}`);
  }

  /**
   * Método para obtener una factura por su id.
   */
  public findByID(id: string): Observable<any> {
    return this.get(`${environment.siigoApi}/invoices/${id}`);
  }

  /**
   * Método para obtener los usuarios vendedores.
   */
  public getSellers(): Observable<any> {
    return this.get(`${environment.siigoApi}/users`);
  }

  /**
   * Método para obtener los tipos de facturas.
   */
  public getDocumentTypes(): Observable<any> {
    return this.get(`${environment.siigoApi}/document-types?type=FV`);
  }

  /**
   * Método para obtener los métodos de pago.
   */
  public getPaymentMethods(): Observable<any> {
    return this.get(`${environment.siigoApi}/payment-types/FV`);
  }
}
