import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../navigation/nav-bar/nav-bar.component';
import { PreloadingComponent } from '../navigation/preloading/preloading.component';

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
  public price:number = 0; 

  private _lastRefreshTime = new Date().getTime();
  private _ref = inject(ChangeDetectorRef); 
  private _ngZone = inject(NgZone);


  public ngOnInit(){
    // this._ref.detach();
    // this._ref.detectChanges();

    // this._ngZone.runOutsideAngular(
    //   ()=>{
        setInterval( 
          ()=>{
              this.price++;
              // condition pour rafrâichir le template. 
              // changeDetectorRef sert à définir une nouvelle politique 
              // de rafraîchissement des composants afin de sauvegarder 
              // des performances sur les composants qui changent leur donnée
              // à très haute fréquence
              if( new Date().getTime() - this._lastRefreshTime >= 1000){
                this._lastRefreshTime = new Date().getTime();

                // this._ngZone.runTask(
                //   ()=>{
                    this._ref.markForCheck();
                    // this._ref.detectChanges();
                //   }
                // )
              }
          }, 
          100
        );
    //   }
    // )
    

  }
}
