import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvViewComponent } from './csv-view.component';

describe('CsvViewComponent', () => {
  let component: CsvViewComponent;
  let fixture: ComponentFixture<CsvViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
