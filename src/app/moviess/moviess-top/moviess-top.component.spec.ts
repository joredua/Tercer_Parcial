import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviessTopComponent } from './moviess-top.component';

describe('MoviessTopComponent', () => {
  let component: MoviessTopComponent;
  let fixture: ComponentFixture<MoviessTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviessTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviessTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
