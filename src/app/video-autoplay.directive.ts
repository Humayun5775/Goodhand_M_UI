import { Directive } from '@angular/core';

@Directive({
  selector: '[appVideoAutoplay]',
  host: {
    'autoplay': '',
    'oncanplay': 'this.play()',
    'onloadedmetadata': 'this.muted = true'
  }
}
)
export class VideoAutoplayDirective {

  constructor() { }

}
