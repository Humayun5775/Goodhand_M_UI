import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonDirective } from 'src/app/back-button.directive';



@NgModule({
  declarations: [BackButtonDirective],
  exports: [BackButtonDirective],
  imports: [
    CommonModule
    
  ]
})
export class SharedModule { }
