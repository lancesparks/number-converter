// data.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ConversionService } from '../services/conversion.service';

@Injectable({
  providedIn: 'root',
})
export class DataGuard implements CanActivate {
  constructor(private router: Router) {}

  private cs = inject(ConversionService);

  canActivate(): Observable<boolean> {
    return this.cs.conversionResult$.pipe(
      take(1),
      map((result: number) => result !== null),
      tap((canActivate: boolean) => {
        if (!canActivate) {
          this.router.navigate(['/converter']);
        }
      })
    );
  }
}
