import { CommonModule } from '@angular/common';
import { OnInit, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConversionService } from '../../services/conversion.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  private cs: ConversionService = inject(ConversionService);
  private router: Router = inject(Router);
  public result$: Observable<number>;
  ngOnInit() {
    this.result$ = this.cs.conversionResult$;
  }

  reset() {
    this.router.navigate(['/converter']);
    this.cs.conversionResult$.next(null);
  }
}
