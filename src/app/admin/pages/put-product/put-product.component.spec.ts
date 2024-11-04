import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutProductComponent } from './put-product.component';

describe('PutProductComponent', () => {
  let component: PutProductComponent;
  let fixture: ComponentFixture<PutProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PutProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
