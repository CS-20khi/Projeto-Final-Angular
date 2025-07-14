import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InformacaoUsuario } from '../models/user';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
logout() {
  sessionStorage.removeItem("nome"); 
  sessionStorage.removeItem("id")
  sessionStorage.removeItem("mail")
  console.log('Usuário deslogado. Dados da sessão limpos.');
  
}

http = inject(HttpClient)

  login(nome: string, senha: string): Observable<InformacaoUsuario> {
     return this.http.post<InformacaoUsuario>('http://localhost:3001/login', { nome, senha })
     .pipe(
      tap(
        (user)=> {
          sessionStorage.setItem("nome", user.nome)
        }
      )
     )
  }
    
   
 
}

