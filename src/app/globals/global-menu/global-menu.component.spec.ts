import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalMenuComponent } from './global-menu.component';

describe('GlobalMenuComponent', () => {
  let component: GlobalMenuComponent;
  let fixture: ComponentFixture<GlobalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
