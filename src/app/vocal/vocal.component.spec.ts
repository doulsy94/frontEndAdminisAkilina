import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocalComponent } from './vocal.component';

describe('VocalComponent', () => {
  let component: VocalComponent;
  let fixture: ComponentFixture<VocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
