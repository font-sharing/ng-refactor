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
    const validator = {
      month: [
        {validate: () => budget.month === '', error: this.MONTH_EMPTY},
        {validate: () => !(/^\d{4}-\d{2}$/g).test(budget.month), error: this.MONTH_FORMAT_INVALID},
        {validate: () => true, error: ''}
      ],
      amount: [
        {validate: () => budget.amount === '', error: this.AMOUNT_EMPTY},
        {validate: () => isNaN(parseInt(budget.amount, 10)) || budget.amount < 0, error: this.AMOUNT_INVALID},
        {validate: () => true, error: ''}
      ]
    };
    for (const field in validator) {
      this.errors[field] = validator[field].find(v => v.validate()).error;
    }
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
