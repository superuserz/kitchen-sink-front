import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {

  transform(value: string, visibleDigits: number = 4, maskChar: string = '*'): string {
    if (!value) return '';
    const len = value.length;
    const maskedLength = Math.max(0, len - visibleDigits);
    const maskedPart = maskChar.repeat(maskedLength);
    const visiblePart = value.slice(-visibleDigits);
    return maskedPart + visiblePart;
  }

}
