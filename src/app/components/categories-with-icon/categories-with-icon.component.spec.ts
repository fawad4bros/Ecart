import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesWithIconComponent } from './categories-with-icon.component';

describe('CategoriesWithIconComponent', () => {
  let component: CategoriesWithIconComponent;
  let fixture: ComponentFixture<CategoriesWithIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesWithIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
