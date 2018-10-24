export class FizzBuzz {
  query(data: number): string {
    const lookup = [
      {key: 15, value: 'FizzBuzz'},
      {key: 5, value: 'Buzz'},
      {key: 3, value: 'Fizz'},
      {key: 1, value: data.toString()}
    ];

    return lookup.find(i => data % i.key === 0).value;
  }
}
