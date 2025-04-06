import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value; // Si la recherche est vide, retourne la liste complète.
    }
    return value.filter(item =>
      item.patient?.nom.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
