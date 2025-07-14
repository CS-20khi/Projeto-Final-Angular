
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const nome = sessionStorage.getItem("nome"); 

  console.log('--- Login Guard Check ---');
  console.log('Attempting to access route:', state.url);
  console.log('Value of "nome" in sessionStorage:', nome);

  if (!nome) { 
    console.warn("Usuario não está autenticado! Redirecionando...");
    alert("Usuário não está autenticado!"); 
    router.navigate([""]); 
    return false; 
  }

  console.log('Usuario autenticado. Acesso permitido.');
  return true; 
};