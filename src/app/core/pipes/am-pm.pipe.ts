import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amPm',
  standalone: true,
})
export class AmPmPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value !== undefined && !isNaN(value)) {
      return parseInt(value) >= 12 ? `${value} pm` : `${value} am`;
    }
    return null;
  }
}
