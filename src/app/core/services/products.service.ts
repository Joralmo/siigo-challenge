import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { environment } from '@env/environment';
import { Product } from '@core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  /**
   * Método para obtener todos los productos creados.
   */
  public getAll(): Observable<any> {
    return this.get(`${environment.siigoApi}/products`);
  }

  /**
   * Método para crear un producto.
   */
  public create(data: Product): Observable<any> {
    return this.post(`${environment.siigoApi}/products`, data);
  }

  /**
   * Método para actualizar un producto.
   */
  public update(data: Product): Observable<any> {
    return this.post(`${environment.siigoApi}/products/${data.id}`, data);
  }

  /**
   * Método para eliminar un producto.
   */
  public remove(id: string): Observable<any> {
    return this.delete(`${environment.siigoApi}/products/${id}`);
  }

  /**
   * Método para obtener un producto por su id.
   */
  public findByID(id: string): Observable<any> {
    return this.get(`${environment.siigoApi}/products/${id}`);
  }

  /**
   * Método para obtener los grupo de inventario.
   */
  public getAccountsGroups(): Observable<any> {
    return this.get(`${environment.siigoApi}/account-groups`);
  }
}
