import { Pipe, PipeTransform } from '@angular/core';
import { owner, Piece, Turn } from './chess-rules';

@Pipe({
    name: 'owner',
    standalone: true,
})
export class OwnerPipe implements PipeTransform {
  transform(value: Piece): Turn | undefined {
    return owner(value);
  }
}
