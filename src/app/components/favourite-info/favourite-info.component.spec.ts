import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteInfoComponent } from './favourite-info.component';

describe('FavouriteInfoComponent', () => {
  let component: FavouriteInfoComponent;
  let fixture: ComponentFixture<FavouriteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
