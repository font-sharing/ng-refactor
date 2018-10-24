import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AddBudgetComponent} from './add-budget.component';
import {FormsModule} from '@angular/forms';
import {BudgetService} from '../budget.service';

describe('AddBudgetComponent', () => {
  let component: AddBudgetComponent;
  let fixture: ComponentFixture<AddBudgetComponent>;
  let budgetService: BudgetService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBudgetComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBudgetComponent);
    budgetService = fixture.debugElement.injector.get(BudgetService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});

