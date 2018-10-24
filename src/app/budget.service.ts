import { Injectable } from '@angular/core';
import { Budget } from './../domain/models';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budgets: Budget[] = [
    {month: '2018-01', amount: 31000},
    {month: '2018-02', amount: 2800},
    {month: '2018-03', amount: 3100},
    {month: '2018-04', amount: 30000},
    {month: '2018-05', amount: 31000},
  ];

  constructor() {
  }

  getBudgets() {
    const serializedData = localStorage.getItem('budgets');
    this.budgets = serializedData ? JSON.parse(serializedData) : this.budgets;

    return this.budgets;
  }

  addBudget(budget) {
    this.budgets.push(budget);
    this.save();
  }

  updateBudget(budget) {
    const existBudget = this.budgets.find(b => b.month === budget.month);
    existBudget.amount = budget.amount;
    this.save();
  }

  save() {
    const serializedData = JSON.stringify(this.budgets);
    localStorage.setItem('budgets', serializedData);
  }
}
