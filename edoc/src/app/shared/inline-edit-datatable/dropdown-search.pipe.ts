import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class DropdownSearchPipe implements PipeTransform {

  transform(items: any[], searchText: any, field: any): any[] {
    if (!items) {
      return [];
    }
    if (!searchText[field]) {
      return items;
    }
    return items.filter(it => {
      return Object.keys(it).some((val: any) => {
        if (typeof it[field] === 'string') {
          return it[field]
            .toLowerCase()
            .includes(searchText[field].toLowerCase());
        }
      });
    });
  }

}
