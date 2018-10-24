import { Component, OnInit } from '@angular/core';
import { BudgetService } from './../budget.service';
import { Budget } from './../../domain/models';
import { BudgetActionService } from '../budget-action.service';

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

  constructor(private budgetActionService: BudgetActionService) {
  }

  ngOnInit() {
  }

  save() {
    this.budgetActionService.save(this.budget);
  }

  cancel() {
  }
}
