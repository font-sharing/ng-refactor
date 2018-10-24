import { Component, OnInit } from '@angular/core';
import { BudgetService } from './../budget.service';
import { Budget } from './../../domain/models';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss']
})
export class AddBudgetComponent implements OnInit {

  budget: any = {
    month: '',
    amount: 0
  };

  errors = {
    month: '',
    amount: ''
  };

  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {
  }

  save() {
    let monthValid, amountValid;
    if (this.budget.month === '') {
      this.errors.month = 'Month cannot be empty';
      monthValid = false;
    } else if (!(/^\d{4}-\d{2}$/g).test(this.budget.month)) {
      this.errors.month = 'Invalid month format';
      monthValid = false;
    } else {
      this.errors.month = '';
      monthValid = true;
    }
    if (this.budget.amount === '') {
      this.errors.amount = 'Amount cannot be empty';
      amountValid = false;
    } else if (isNaN(parseInt(this.budget.amount, 10)) || this.budget.amount < 0) {
      this.errors.amount = 'Invalid amount';
      amountValid = false;
    } else {
      this.errors.amount = '';
      amountValid = true;
    }
    if (!monthValid || !amountValid) {
      return;
    }

    const budgets = this.budgetService.getBudgets();
    const existing = budgets && budgets.find(budget => budget.month === this.budget.month);
    if (existing) {
      this.budgetService.updateBudget(this.budget);
    } else {
      this.budgetService.addBudget(this.budget);
    }
  }

  cancel() {
  }
}
