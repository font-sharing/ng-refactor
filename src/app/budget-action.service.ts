import { Injectable } from '@angular/core';
import { BudgetService } from './budget.service';
import { FORMAT, NOT_EMPTY, POSITIVE_NUMBER } from '../domain/validator';
import Validator from '../domain/validator';

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
    const rules = {
      month: [NOT_EMPTY, FORMAT],
      amount: [NOT_EMPTY, POSITIVE_NUMBER]
    };

    const validator = new Validator(rules);
    this.errors = validator.validate(budget);
    if (validator.valid) {
      const budgets = this.budgetService.getBudgets();
      const existing = budgets && budgets.find(b => b.month === budget.month);
      if (existing) {
        this.budgetService.updateBudget(budget);
      } else {
        this.budgetService.addBudget(budget);
      }
    }

    return this.errors;
  }
}
