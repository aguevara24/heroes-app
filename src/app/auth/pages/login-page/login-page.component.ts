import { Component, inject } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  private authService = inject( AuthService );
  private router = inject( Router )
  onLogin(): void {
    this.authService.login( 'aguevara24@hotmail.com', '123456' )
      .subscribe( user => {
        this.router.navigate(['/']);
      });
  }
}
