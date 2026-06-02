import { Component } from '@angular/core';

@Component({
  selector: 'app-id-card',
  standalone: true,
  imports: [],
  templateUrl: './id-card.component.html',
  styleUrl: './id-card.component.css'
})
export class IdCardComponent {
  public name: string = 'Mélanie Colombier';
}
