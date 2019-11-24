import { Pipe, PipeTransform } from '@angular/core';
import { Cat } from '../services/cats.service';

@Pipe({
  name: 'catsFilter'
})
export class CatsFilterPipe implements PipeTransform {

  transform(cats: Cat[], search = ''): Cat[] {
    if (!search.trim()) {
      return cats;
    }
    console.log(search.toLowerCase());
    return cats.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  }

}
