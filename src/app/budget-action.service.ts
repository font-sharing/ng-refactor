import { Injectable } from '@angular/core';
import { BudgetService } from './budget.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetActionService {

  errors = {
    month: '',
    amount: ''
  };

  constructor(private budgetService: BudgetService) {
  }

  private MONTH_EMPTY = 'Month cannot be empty';
  private MONTH_FORMAT_INVALID = 'Invalid month format';
  private AMOUNT_EMPTY = 'Amount cannot be empty';
  private AMOUNT_INVALID = 'Invalid amount';

  save(budget) {
    const monthValidator = [
      {validate: () => budget.month === '', error: this.MONTH_EMPTY},
      {validate: () => !(/^\d{4}-\d{2}$/g).test(budget.month), error: this.MONTH_FORMAT_INVALID},
      {validate: () => true, error: ''}
    ];
    const amountValidator = [
      {validate: () => budget.amount === '', error: this.AMOUNT_EMPTY},
      {validate: () => isNaN(parseInt(budget.amount, 10)) || budget.amount < 0, error: this.AMOUNT_INVALID},
      {validate: () => true, error: ''}
    ];
    this.errors.month = monthValidator.find(v => v.validate()).error;
    this.errors.amount = amountValidator.find(v => v.validate()).error;
    if (this.errors.month || this.errors.amount) {
      return this.errors;
    }

    const budgets = this.budgetService.getBudgets();
    const existing = budgets && budgets.find(b => b.month === budget.month);
    if (existing) {
      this.budgetService.updateBudget(budget);
    } else {
      this.budgetService.addBudget(budget);
    }

    return this.errors;
  }
}
