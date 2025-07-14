import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginForm {
  loginService = inject(LoginService);
  router = inject(Router);

  loginForm = new FormGroup({
    nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
    senha: new FormControl("", [Validators.required]),
    logarAutomaticamente: new FormControl(false)
  });

  errorMessage: string | null = null;
  alertType: string | null = null;

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = "Por favor, preencha o nome de usuário e a senha corretamente!";
      this.alertType = "error";
      this.loginForm.markAllAsTouched();
      return;
    }

    const nome = this.loginForm.value.nome ?? '';
    const senha = this.loginForm.value.senha ?? '';
    const logarAutomaticamente = this.loginForm.value.logarAutomaticamente ?? false;

    this.loginService.login(nome, senha).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        this.errorMessage = "Login realizado com sucesso!";
        this.alertType = "success";

        sessionStorage.setItem('nome', nome);

        if (logarAutomaticamente) {
          localStorage.setItem('nomeUsuarioPersistente', nome);
        }

        this.loginForm.reset();
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro de login:', err);

        if (err.status === 401) {
          this.errorMessage = "Usuário ou senha incorretos!";
          this.alertType = "error";
          return;
        }

        this.errorMessage = err.message || 'Ocorreu um erro desconhecido. Tente novamente mais tarde.';
        this.alertType = "error";
      }
    });
  }
}
