import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesrendezVousComponent } from './mesrendez-vous.component';

describe('MesrendezVousComponent', () => {
  let component: MesrendezVousComponent;
  let fixture: ComponentFixture<MesrendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesrendezVousComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesrendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
