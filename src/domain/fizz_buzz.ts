export class FizzBuzz {
  query(data: number): string {
    if (data % 3 === 0) {
      return 'Fizz';
    } else if (data % 5 === 0) {
      return 'Buzz';
    } else if (data % 15 === 0) {
      return 'FizzBuzz';
    }

    return data.toString();
  }
}
