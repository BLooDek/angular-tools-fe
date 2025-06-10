import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTabComponent } from './add-new-tab.component';

describe('AddNewTabComponent', () => {
  let component: AddNewTabComponent;
  let fixture: ComponentFixture<AddNewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
