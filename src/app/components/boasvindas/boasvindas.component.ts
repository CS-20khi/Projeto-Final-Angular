import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-boasvindas',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './boasvindas.component.html',
  styleUrls: ['./boasvindas.component.css']
})
export class BoasvindasComponent implements OnInit { 
  
  private router = inject(Router); 

  
  nomeUsuario: string | null = null;

  ngOnInit(): void {
    
    this.nomeUsuario = sessionStorage.getItem('nome');

    
    if (!this.nomeUsuario) {
      console.warn('Nome do usuário não encontrado na sessão. Redirecionando para login.');
      this.router.navigate(['/login']);
    }
  }

  
}