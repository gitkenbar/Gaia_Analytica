import { Component, Input, OnInit } from '@angular/core';
import { Form, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dynamicform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dynamicform.component.html',
  styleUrl: './dynamicform.component.scss'
})
export class DynamicformComponent implements OnInit{

  /* NOT SURE IF THIS IS POSSIBLE */
  /* MIGHT JUST BE MORE WORK THAN ITS WORTH*/
  /* GONNA JUST DO SEPERATE COMPONENTS FOR NOW */
  @Input() form!: FormGroup;

  displayedForm!:FormGroup;

  ngOnInit():void{
   /*  if(this.form){
      this.form.subscribe(form => this.displayedForm = form)
    } */
  }

}
