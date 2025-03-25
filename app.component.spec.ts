import { TestBed } from '@angular/core/testing';
import * as appComponent from './src/app/app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [appComponent.AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(appComponent.AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'telemedecine-frontend' title`, () => {
    const fixture = TestBed.createComponent(appComponent.AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('telemedecine-frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(appComponent.AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, telemedecine-frontend');
  });
});
