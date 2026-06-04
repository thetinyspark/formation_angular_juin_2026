import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadingService {

  public isLoading = signal<boolean>(false);
  constructor() { }
}
