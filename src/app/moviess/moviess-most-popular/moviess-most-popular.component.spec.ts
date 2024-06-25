import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviessMostPopularComponent } from './moviess-most-popular.component';

describe('MoviessMostPopularComponent', () => {
  let component: MoviessMostPopularComponent;
  let fixture: ComponentFixture<MoviessMostPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviessMostPopularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviessMostPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
