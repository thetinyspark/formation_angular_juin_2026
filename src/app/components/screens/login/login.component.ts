import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { NgIf } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private _loginService:LoginService = inject(LoginService);
  private _builder:FormBuilder = inject(FormBuilder);
  public connected:boolean = false;

  public form:FormGroup = this._builder.group(
    {
      email: ["admin@admin.com", [Validators.required, Validators.email]], 
      password: ["admin", [Validators.required, this.validatePassword]], 
    }
  );


  public ngOnInit(){
    this.connected = this._loginService.isConnected();
  }


  public validatePassword(control:AbstractControl){
    const password:string = control.value;
    const isValid = password.length >= 4;
    // quand on retourne null dans un validator, ça veut dire que le champ est valide
    // sinon on retourne un objet qui nous décrit les erreurs
    if( isValid )
      return null;
    else
      return {tooShortPassword: true};
  }

  public onSubmit(){
    if( this.form.valid ){
      const result = this._loginService.login(
        this.form.get("email")?.value || "", 
        this.form.get("password")?.value || "", 
      );

      this.connected = result;

      if( result )
        alert("connexion réussie");
      else
        alert("échec de la connexion");
    }
    else{
      alert("Formulaire invalide !");
      console.log(this.form.get("email")?.errors);
      console.log(this.form.get("password")?.errors);
    }
  }

 

  public logout():void{
    this._loginService.logout();
    this.connected = this._loginService.isConnected();
  }

}
