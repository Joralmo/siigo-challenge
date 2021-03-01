import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';

const { siigoAuthApi } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  /**
   * Método para autenticarse ante el servidor
   */
  public signIn(data): Observable<any> {
    return this.post(`${siigoAuthApi}/sign-in`, { ...data });
  }
}
