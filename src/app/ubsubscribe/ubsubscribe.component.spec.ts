import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbsubscribeComponent } from './ubsubscribe.component';

describe('UbsubscribeComponent', () => {
  let component: UbsubscribeComponent;
  let fixture: ComponentFixture<UbsubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbsubscribeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UbsubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
