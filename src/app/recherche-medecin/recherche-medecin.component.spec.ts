import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheMedecinComponent } from './recherche-medecin.component';

describe('RechercheMedecinComponent', () => {
  let component: RechercheMedecinComponent;
  let fixture: ComponentFixture<RechercheMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheMedecinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
