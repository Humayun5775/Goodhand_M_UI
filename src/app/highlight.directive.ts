import { Directive, PipeTransform } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective  implements PipeTransform {

  constructor() { }
  transform(value: any, args: any): any {
    if (!args) {return value;}
    for(const text of args) {
        var reText = new RegExp(text, 'gi');
        value = value.replace(reText, "<mark>" + text + "</mark>");
        //for your custom css
        // value = value.replace(reText, "<span class='highlight-search-text'>" + text + "</span>"); 


    }
    return value;
}
}
