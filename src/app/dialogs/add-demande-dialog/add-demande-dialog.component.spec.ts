import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemandeDialogComponent } from './add-demande-dialog.component';

describe('AddDemandeDialogComponent', () => {
  let component: AddDemandeDialogComponent;
  let fixture: ComponentFixture<AddDemandeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDemandeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDemandeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
