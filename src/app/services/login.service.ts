import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public login(username: string, password: string): boolean {
    // Ici, on simule une authentification en vérifiant si le nom d'utilisateur et le mot de passe sont corrects.
    // Dans une application réelle, vous devriez faire une requête à un serveur pour vérifier les informations d'identification.
    if (username === 'admin' && password === 'admin') {
      // Si les informations d'identification sont correctes, on peut stocker un token ou une information de session.
      localStorage.setItem('isConnected', 'true');
      return true;
    }
    else{
      localStorage.setItem('isConnected', 'false');
    }
    return false;
  }

  public logout():void{
    // Pour se déconnecter, on peut simplement supprimer le token ou l'information de session.
    localStorage.setItem('isConnected', 'false');
  }

  public isConnected(): boolean {
    // On vérifie si l'utilisateur est connecté en vérifiant la présence d'un token ou d'une information de session.
    return localStorage.getItem('isConnected') === 'true';
  }
}
