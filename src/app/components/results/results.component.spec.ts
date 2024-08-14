import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ConversionService } from '../../services/conversion.service';
import { ResultsComponent } from './results.component';
import { Router } from '@angular/router';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let cs: ConversionService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsComponent],

      providers: [
        ConversionService,
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    cs = TestBed.inject(ConversionService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize result$ observable', () => {
    expect(component.result$).toBeDefined();
    expect(component.result$).toBe(cs.conversionResult$);
  });

  it('should navigate to /converter on reset', () => {
    component.reset();
    expect(router.navigate).toHaveBeenCalledWith(['/converter']);
  });

  it('should set conversionResult$ to null on reset', () => {
    component.reset();
    expect(cs.conversionResult$.getValue()).toBeNull();
  });
});
