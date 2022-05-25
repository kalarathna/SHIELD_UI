import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordnotifictaionComponent } from './passwordnotifictaion.component';

describe('PasswordnotifictaionComponent', () => {
  let component: PasswordnotifictaionComponent;
  let fixture: ComponentFixture<PasswordnotifictaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordnotifictaionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordnotifictaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
