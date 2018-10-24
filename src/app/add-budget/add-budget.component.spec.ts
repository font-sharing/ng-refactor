import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AddBudgetComponent} from './add-budget.component';
import {FormsModule} from '@angular/forms';
import {BudgetService} from '../budget.service';

describe('AddBudgetComponent', () => {
  let component: AddBudgetComponent;
  let fixture: ComponentFixture<AddBudgetComponent>;
  let budgetService: BudgetService;
  const validation_failed_with = (field, message) => expect(component.errors[field]).toEqual(message);

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

  it('default value', () => {
    expect(component.budget).toEqual({month: '', amount: 0});
  });

  it('default errors should be empty', () => {
    expect(component.errors).toEqual({month: '', amount: ''});
  });

  it('month should not be empty', () => {
    component.budget.month = '';
    component.save();
    validation_failed_with('month', 'Month cannot be empty');
  });

  it('month format should be YYYY-MM', () => {
    component.budget.month = 'INVALID';
    component.save();
    validation_failed_with('month', 'Invalid month format');
  });

  it('amount should not be empty', () => {
    component.budget.amount = '';
    component.save();
    validation_failed_with('amount', 'Amount cannot be empty');
  });

  it('amount should be a number', () => {
    component.budget.amount = 'NOT A NUMBER';
    component.save();
    validation_failed_with('amount', 'Invalid amount');
  });

  it('amount should be a number', () => {
    component.budget.amount = -1;
    component.save();
    validation_failed_with('amount', 'Invalid amount');
  });

  it('add a budget', () => {
    budgetService.getBudgets = () => [];
    spyOn(budgetService, 'addBudget').and.callFake(b => {
    });
    component.budget.month = '2019-01';
    component.budget.amount = 1000;
    component.save();
    expect(budgetService.addBudget).toHaveBeenCalledWith(component.budget);
  });

  it('update the existing budget if budget of month exists', () => {
    budgetService.getBudgets = () => [{month: '2019-01', amount: 500}];
    spyOn(budgetService, 'updateBudget').and.callFake(b => {
    });
    component.budget.month = '2019-01';
    component.budget.amount = 1000;
    component.save();
    expect(budgetService.updateBudget).toHaveBeenCalledWith(component.budget);
  });
});

