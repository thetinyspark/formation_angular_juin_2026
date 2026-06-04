import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../navigation/nav-bar/nav-bar.component';
import { PreloadingComponent } from '../navigation/preloading/preloading.component';


class ExampleComponent{
  private _oldState:any = {};
  private _state:any = {};

  // quand l'état d'un composant est déterminé 
  // on part du principe qu'il est gelé (on ne peut plus le modifier)
  // si l'on souhaite changer du composant alors on le clone
  // puis on écrase les valeurs commune entre les deux états (courants et nouveaux)
  // par les valeurs du nouvel état, puis on gèle le nouvel état ainsi crée. 

  public setState( newState:any ){
    let clone:any = {}; 
    for( var prop in this._state){
      clone[prop] = this._state[prop];
    }

    for( var prop in newState){
      clone[prop] = newState[prop];
    }
    // this._state = {...this._state, ...newState}; 

    // on gèle l'état
    Object.freeze(this._state);
  }

  public getState(){
    return this._state;
  }

  public needsUpdate(){
      return!( this._oldState === this._state );
  }

  // il est alors facile de vérifier si le composant a besoin d'être actualisé
  // si l'ancien état n'est pas le même que l'état en cours , alors on actualise
  // la vue et on dit que l'ancien état est égal au nouvel état
  public update(){
    if( this._oldState === this._state )
      return false;

    this._oldState = this._state;
    return true;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, PreloadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public title:string = 'My Video Game Store';

  public ngOnInit(){

    const comp = new ExampleComponent();
    comp.setState({name: "Merlin"}); 
    console.log(comp.needsUpdate(), comp.getState());
    comp.update();
    console.log(comp.needsUpdate(), comp.getState());

    comp.setState({name: "Arthur", age: "30", weapon: "sword"}); 
    console.log(comp.needsUpdate(), comp.getState());
    comp.update();
    console.log(comp.needsUpdate(), comp.getState());

    comp.setState({name: "Guenièvre", age: "32"}); 
    console.log(comp.needsUpdate(), comp.getState());
    comp.update();
    console.log(comp.needsUpdate(), comp.getState());

  }
}
