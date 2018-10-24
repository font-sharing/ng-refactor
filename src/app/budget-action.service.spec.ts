import { TestBed } from '@angular/core/testing';

import { BudgetActionService } from './budget-action.service';
import { BudgetService } from './budget.service';

describe('BudgetActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  let component: BudgetActionService;
  let budgetService: BudgetService;
  const validation_failed_with = (field, message) => expect(component.errors[field]).toEqual(message);

  beforeEach(() => {
    component = TestBed.get(BudgetActionService);
    budgetService = TestBed.get(BudgetService);
  });

  it('default errors should be empty', () => {
    expect(component.errors).toEqual({month: '', amount: ''});
  });

  it('month should not be empty', () => {
    component.save({month: ''});
    validation_failed_with('month', 'Month cannot be empty');
  });

  it('month format should be YYYY-MM', () => {
    component.save({month: 'INVALID'});
    validation_failed_with('month', 'Invalid month format');
  });

  it('amount should not be empty', () => {
    component.save({amount: ''});
    validation_failed_with('amount', 'Amount cannot be empty');
  });

  it('amount should be a number', () => {
    component.save({amount: 'NOT A NUMBER'});
    validation_failed_with('amount', 'Invalid amount');
  });

  it('amount should be a number', () => {
    component.save({amount: -1});
    validation_failed_with('amount', 'Invalid amount');
  });

  it('add a budget', () => {
    budgetService.getBudgets = () => [];
    spyOn(budgetService, 'addBudget').and.callFake(b => {});
    const budget = {month: '2019-01', amount: 1000};
    component.save(budget);
    expect(budgetService.addBudget).toHaveBeenCalledWith(budget);
  });

  it('update the existing budget if budget of month exists', () => {
    budgetService.getBudgets = () => [{month: '2019-01', amount: 500}];
    spyOn(budgetService, 'updateBudget').and.callFake(b => {});
    const budget = {month: '2019-01', amount: 1000};
    component.save(budget);
    expect(budgetService.updateBudget).toHaveBeenCalledWith(budget);
  });
});
