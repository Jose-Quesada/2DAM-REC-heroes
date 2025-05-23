import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'heroImage',
  standalone: false
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    if (!hero.id && !hero.alt_img ){
      return 'no-image.png';
    }

    if ( hero.alt_img ) return hero.alt_img; // URL: www.dominio.com/imagen

    return `heroes/${ hero.id }.jpg`
  }


}
