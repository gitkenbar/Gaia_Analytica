import { Component, input, computed, signal } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculators',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './calculators.component.html',
  styleUrl: './calculators.component.scss'
})
export class CalculatorsComponent{

  form = new FormGroup({
    gardenLength: new FormControl(10),
    gardenWidth: new FormControl(10),
    compostDepth: new FormControl(3)
  })

  sqft = signal(100)
  cubicYards = signal(.92)
  fiveGallonBuckets = signal(16.6)
  thirtyTwoGallonBin = signal(5.84)



  calculateCubicFeet(length:number, width:number, depth:number){
    return (depth / 12) * length * width
  }

  updateCalc(){
    this.sqft.set(Number(this.form.controls.gardenLength.value) * Number(this.form.controls.gardenWidth.value))

    this.cubicYards.set(Number((this.calculateCubicFeet(Number(this.form.controls.gardenLength.value), Number(this.form.controls.gardenWidth.value), Number(this.form.controls.compostDepth.value)) / 27).toFixed(4)))

    this.fiveGallonBuckets.set(Number((this.calculateCubicFeet(Number(this.form.controls.gardenLength.value), Number(this.form.controls.gardenWidth.value), Number(this.form.controls.compostDepth.value)) / 1.5).toFixed(4)))

    this.thirtyTwoGallonBin.set(Number((this.calculateCubicFeet(Number(this.form.controls.gardenLength.value), Number(this.form.controls.gardenWidth.value), Number(this.form.controls.compostDepth.value)) / 4.277).toFixed(4)))
  }
}
