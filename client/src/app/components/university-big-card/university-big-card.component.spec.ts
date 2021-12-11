import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityBigCardComponent } from './university-big-card.component';

describe('UniversityBigCardComponent', () => {
  let component: UniversityBigCardComponent;
  let fixture: ComponentFixture<UniversityBigCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversityBigCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityBigCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
