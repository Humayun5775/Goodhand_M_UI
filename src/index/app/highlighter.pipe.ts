import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!args) {return value;}

var reText = new RegExp(args, 'gi');
        //for your custom css
        value = value.replace(reText, "<span class='dv_unbold'>" + args + "</span>"); 


   
    return value;

}
}
