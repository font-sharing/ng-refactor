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

  save(budget) {
    let monthValid, amountValid;
    if (budget.month === '') {
      this.errors.month = 'Month cannot be empty';
      monthValid = false;
    } else if (!(/^\d{4}-\d{2}$/g).test(budget.month)) {
      this.errors.month = 'Invalid month format';
      monthValid = false;
    } else {
      this.errors.month = '';
      monthValid = true;
    }
    if (budget.amount === '') {
      this.errors.amount = 'Amount cannot be empty';
      amountValid = false;
    } else if (isNaN(parseInt(budget.amount, 10)) || budget.amount < 0) {
      this.errors.amount = 'Invalid amount';
      amountValid = false;
    } else {
      this.errors.amount = '';
      amountValid = true;
    }
    if (!monthValid || !amountValid) {
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
