export interface Profile {
  name: string;
  birthday: DateTime;
}

export interface DateTime {
  month: number;
  day: number;
}

export interface Budget {
  month: string;
  amount: number;
}
