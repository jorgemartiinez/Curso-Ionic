import { environment } from 'src/environments/environment.prod';
import { Pipe, PipeTransform } from '@angular/core';
const URL = environment.url;
@Pipe({
    name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
    transform(img: string, userId: string): string {
        return `${ URL }/posts/imagen/${ userId }/${ img }`;
    }
}
