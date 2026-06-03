import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private _loginService:LoginService = inject(LoginService);

  public login():void{
    this._loginService.login('admin', 'admin');
  }

  public logout():void{
    this._loginService.logout();
  }

  public isConnected():boolean{
    return this._loginService.isConnected();
  }
}
