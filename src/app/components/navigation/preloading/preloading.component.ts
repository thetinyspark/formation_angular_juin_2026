import { Component, inject } from '@angular/core';
import { PreloadingService } from '../../../services/preloading.service';

@Component({
  selector: 'app-preloading',
  standalone: true,
  imports: [],
  templateUrl: './preloading.component.html',
  styleUrl: './preloading.component.css'
})
export class PreloadingComponent {
  public preloadingService = inject(PreloadingService);
  public isLoading = this.preloadingService.isLoading;
}
