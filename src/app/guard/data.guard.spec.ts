import { TestBed } from '@angular/core/testing';
import { ConversionService } from '../services/conversion.service';
import { DataGuard } from './data.guard';
import { Router } from '@angular/router';

describe('DataGuard', () => {
  let guard: DataGuard;
  let cs: ConversionService;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  let router: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DataGuard,
        ConversionService,
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    guard = TestBed.inject(DataGuard);
    cs = TestBed.inject(ConversionService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if conversionResult$ is true', () => {
    cs.conversionResult$.next(100);
    expect(guard.canActivate()).toBeTruthy();
  });

  it('should return false and navigate to /converter if conversionResult$ is false', async () => {
    cs.conversionResult$.next(null);
    const canActivate = await guard.canActivate().toPromise();
    expect(canActivate).toBeFalsy();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/converter']);
  });
});
