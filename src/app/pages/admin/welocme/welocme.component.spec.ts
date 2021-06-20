import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelocmeComponent } from './welocme.component';

describe('WelocmeComponent', () => {
  let component: WelocmeComponent;
  let fixture: ComponentFixture<WelocmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelocmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelocmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
