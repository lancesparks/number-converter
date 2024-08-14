import { TestBed } from '@angular/core/testing';
import { ConversionService } from './conversion.service';

describe('ConversionService', () => {
  let cs: ConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    cs = TestBed.inject(ConversionService);
  });

  it('should be created', () => {
    expect(cs).toBeTruthy();
  });

  describe('whole numbers', () => {
    it('should create a conversion to thousands', () => {
      cs.createConversion('1k');
      expect(cs.conversionResult$.getValue()).toBe(1000);
    });

    it('should create a conversion to millions', () => {
      cs.createConversion('1m');
      expect(cs.conversionResult$.getValue()).toBe(1000000);
    });
    it('should create a conversion to billions', () => {
      cs.createConversion('1b');
      expect(cs.conversionResult$.getValue()).toBe(1000000000);
    });
    it('should not create a if no letter is added', () => {
      cs.createConversion('1');
      expect(cs.conversionResult$.getValue()).toBe(1);
    });
  });

  describe('decimals', () => {
    it('should create a conversion to hundreds from decimal', () => {
      cs.createConversion('.25k');
      expect(cs.conversionResult$.getValue()).toBe(250);
    });

    it('should create a conversion to thousands from decimal', () => {
      cs.createConversion('.25m');
      expect(cs.conversionResult$.getValue()).toBe(250000);
    });
    it('should create a conversion to millions from decimal', () => {
      cs.createConversion('.25b');
      expect(cs.conversionResult$.getValue()).toBe(250000000);
    });
    it('should not create a if no letter is added, displays a decimal', () => {
      cs.createConversion('.25');
      expect(cs.conversionResult$.getValue()).toBe(0.25);
    });
  });
});
