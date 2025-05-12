import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsultationComponent } from './form-consultation.component';

describe('FormConsultationComponent', () => {
  let component: FormConsultationComponent;
  let fixture: ComponentFixture<FormConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
