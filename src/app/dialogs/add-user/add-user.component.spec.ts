import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserDemandeComponent } from './add-user-demande.component';

describe('AddUserDemandeComponent', () => {
  let component: AddUserDemandeComponent;
  let fixture: ComponentFixture<AddUserDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
