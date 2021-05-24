import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioCliente } from '../models/usuario-cliente';

@Injectable({
  providedIn: 'root'
})
export class CadastroClienteService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAll(): Observable<UsuarioCliente[]> {
    return this.http.get<UsuarioCliente[]>(`${this.baseUrl}/usuarios_clientes`);
  }

  create(usuarioCliente: UsuarioCliente): Observable<UsuarioCliente> {
    return this.http.post<UsuarioCliente>(`${this.baseUrl}/usuarios_clientes`, usuarioCliente);
  }

  update(usuarioCliente: UsuarioCliente): Observable<UsuarioCliente> {
    return this.http.post<UsuarioCliente>(`${this.baseUrl}/usuarios_clientes`, usuarioCliente);
  }

  delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/usuarios_clientes${id}`
    return this.http.delete<void>(url);
  }
}
