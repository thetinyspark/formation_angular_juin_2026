import { Component } from '@angular/core';

@Component({
  selector: 'app-id-card',
  standalone: true,
  imports: [],
  templateUrl: './id-card.component.html',
  styleUrl: './id-card.component.css'
})
export class IdCardComponent {
  public name: string = 'Legrand';
  public firstName: string = 'Nicolas';
  public age: number = 40;
  public sex: string = 'Masculin';
  public profession: string = 'Développeur';
}
