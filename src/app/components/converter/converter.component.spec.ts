import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConverterComponent } from './converter.component';
import { ConversionService } from '../../services/conversion.service';
import { Router } from '@angular/router';

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;
  let cs: ConversionService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConverterComponent],
      providers: [ConversionService, Router],
    }).compileComponents();

    fixture = TestBed.createComponent(ConverterComponent);
    cs = TestBed.inject(ConversionService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('convert', () => {
    beforeEach(() => {
      spyOn(cs, 'createConversion');
      spyOn(router, 'navigate');
    });
    it('should call createConversion with the correct input and navigate to results', () => {
      const numToConvert = '123';
      component.converterForm.get('numberToConvert').setValue(numToConvert);
      component.convert();
      expect(cs.createConversion).toHaveBeenCalledWith(numToConvert);
      expect(router.navigate).toHaveBeenCalledWith(['/results']);
    });

    it('should not call createConversion or navigate if checkErrors returns true', async () => {
      const numToConvert = '123A';

      component.converterForm.get('numberToConvert').setValue(numToConvert);

      component.showError = true;
      component.checkErrors = jasmine.createSpy().and.returnValue(true);

      component.convert();

      expect(cs.createConversion).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('checkErrors', () => {
    it('should return true when input is blank', () => {
      component.checkErrors('');
      expect(component.checkErrors('')).toBe(true);
      expect(component.converterForm.errors).toEqual({
        isBlank: true,
      });
      expect(component.showError).toBe(true);
    });

    it('should return true when input has invalid format', () => {
      component.converterForm
        .get('numberToConvert')
        .setErrors({ invalidFormat: true });
      expect(component.checkErrors('123A')).toBe(true);
      expect(component.showError).toBe(true);
    });

    it('should return false when input is valid', () => {
      expect(component.checkErrors('123')).toBe(false);
      expect(component.showError).toBe(false);
    });
  });

  describe('resetErrors', () => {
    it('should reset showError to false when input is blank and showError is true', () => {
      component.showError = true;
      component.converterForm.get('numberToConvert').setValue('');
      component.resetErrors();
      expect(component.showError).toBe(false);
    });

    it('should not reset showError to false when input is not blank', () => {
      component.showError = true;
      component.converterForm.get('numberToConvert').setValue('123A');
      component.resetErrors();
      expect(component.showError).toBe(true);
    });

    it('should not reset showError to false when showError is already false', () => {
      component.showError = false;
      component.converterForm.get('numberToConvert').setValue('');
      component.resetErrors();
      expect(component.showError).toBe(false);
    });
  });
});
