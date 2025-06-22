import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosContentComponent } from './todos-content.component';

describe('TodosContentComponent', () => {
  let component: TodosContentComponent;
  let fixture: ComponentFixture<TodosContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
