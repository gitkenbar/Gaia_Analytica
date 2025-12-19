import { Component, OnInit, signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js/auto';
import {Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Garden } from '../../core/models/garden';
import { Sow } from '../../core/models/sow';
import { Plant } from '../../core/models/plant';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { SeasonService } from '../../core/services/season.service';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './field.component.html',
  styleUrl: '../../../styles.scss'
})
export class FieldComponent implements OnInit{
  activeGarden = signal(0)
  yearSet = new Set()
  frostDates = ['April 14','October 23']

  sowForm = new FormGroup({
    plantName: new FormControl(''),
    growingTime: new FormControl<number|null>(null),
    color: new FormControl(''),
    plantingTime: new FormControl('2026/4/14'),
  })

  fieldForm = new FormGroup({
    gardenName: new FormControl(''),
    gardenLength: new FormControl(50),
    gardenWidth: new FormControl(3),
  })

  fieldNames:Garden[]= [
    new Garden('Peppers 1', 50, 3, [
      new Sow(new Plant('Red Clover', 16, 'forestgreen'), new Date('1-1-26'), 'forestgreen'),
      new Sow(new Plant('Peppers', 25, 'red'), new Date('4-27-26'), 'red'),
      new Sow(new Plant('Daikon Radish', 12, 'purple'), new Date('10-20-26'), 'purple')
      ]
    )
  ]

  selectModal(index: number, modalId:string){
    this.activeGarden.set(index)
    setTimeout(() => {
      this.openModal(modalId);
    }, 1);

  }


  openModal(modalId:string){
    let modal = document.getElementById(modalId)
    if(modal){
      modal.style.display = "block";
    }
    if(modalId = 'viewModal'){
      this.drawSchedule()
    }
  }

  closeModal(modalId:string){
    setTimeout(()=>
    document.getElementById(modalId)!.style.display = "none", 1)

  };

  drawSchedule(){
    /* Select Canvas */
    let canvas = document.getElementById("scheduleCanvas") as HTMLCanvasElement;
    let ctx = canvas!.getContext("2d");
    /* Clear previous content */
    ctx!.clearRect(0, 0, 1000, 1000)

    /* Draw Calender Lines */
    ctx!.lineWidth = 2
    ctx!.fillStyle = 'black'
    ctx!.beginPath();
    ctx!.moveTo(15, 80);
    ctx!.lineTo(760, 80);
    ctx!.stroke();

    /* Mark Frost Dates */
    ctx!.strokeStyle = 'cyan'
    ctx!.lineWidth = 5
    for(let date of this.frostDates){
      let formatDate = new Date(date + ' ' + new Date().getFullYear())
      let plantingDate = ((formatDate.getMonth())* 62) + (formatDate.getDate() * 2) + 15
      ctx!.beginPath()
      ctx!.moveTo(plantingDate, 0)
      ctx!.lineTo(plantingDate, 78)
      ctx!.stroke()
      ctx!.closePath()
    }

    /* Mark and Label Months */
    ctx!.strokeStyle = 'black'
    ctx!.lineWidth = 2
    let months = ["January", "February", "March", "April","May","June","July","August","September","October","November","December"]
    for (let i = 0; i < 13; i++) {
      let iterableEquation = (i * 62) + 15
      ctx!.moveTo(iterableEquation, 75);
      ctx!.lineTo(iterableEquation, 85);
      ctx!.stroke();
      ctx!.font = "12px serif";
      if(i<12){
        let centeringEquation = (months[i].length * -2.66) + 29
        let labelLocation = iterableEquation + centeringEquation
        ctx!.fillText(months[i], labelLocation, 105)
      }
    }


    /* Visualize Planting plan */
    for(let plantings of this.fieldNames[this.activeGarden()].schedule){
      let plantingDate = ((plantings.plantingDate.getMonth())* 62) + (plantings.plantingDate.getDate() * 2) + 15

      /* Use math to find date, then target that date */
      /* let growingPeriod = plantings.crop.growingTime * 15.5 */
      let targetDate = plantings.endDate
      let targetLocation = (targetDate.getMonth()*62)+(targetDate.getDate() * 2) + 15

      let growingPeriod = targetLocation - plantingDate
      if(plantingDate > targetLocation){
        growingPeriod = 821
      }

      ctx!.fillStyle = plantings.color
      ctx!.fillRect(plantingDate, 15, growingPeriod, 45)
      ctx!.fillStyle = 'whitesmoke'
      ctx!.font = '20px serif'
      ctx!.fillText(plantings.crop.name, plantingDate + 5, 45, growingPeriod)
    }
    ctx!.fillStyle = 'white'
    ctx!.fillRect(759, 15, 25, 45)
  }

  ngOnInit(){
    setTimeout(()=>{
    this.drawSchedule()
    },1)
  }
  productionChart:ChartConfiguration={
    type: 'pie',
    data: {
      labels: [
        'Lettuce',
        'Spinach',
        'Carrots'
      ],
      datasets: [{
        label: 'Field Layout Overview',
        data: [300, 50, 100],
        backgroundColor: [
          'lightgreen',
          'darkgreen',
          'orange'
        ],
        hoverOffset: 4
      }]
    }
  }

  scheduleChart:ChartConfiguration={
    type: 'bar',
    data: {
      labels: [
        'month',
        'crop'
      ],
      datasets:[{
        label: 'Field Planting Overview',
        data: [2025-3-18, 2025-4-10, 2025-4-15, 2025-5-4],
        backgroundColor: [
          'lightgreen',
          'darkgreen',
          'orange'
        ],
        hoverOffset: 4
      }]
    }
  }


  sowSubmit(){
    let sowValues = this.sowForm.controls
    let crop = new Plant(
          sowValues.plantName.value!,
          sowValues.growingTime.value!,
          sowValues.color.value!)
    this.fieldNames[this.activeGarden()].schedule.push(
      new Sow(
         crop,
          new Date(sowValues.plantingTime.value!), crop.defaultColor), )
    this.closeModal('sowModal')
    this.drawSchedule();
  }

  fieldSubmit(){
    this.fieldNames.push(new Garden(
      String(this.fieldForm.controls.gardenName.value),
      Number(this.fieldForm.controls.gardenLength.value),
      Number(this.fieldForm.controls.gardenWidth.value),
      []))

    this.closeModal('fieldModal')
  }

  removePlant(scheduleIndex: number){
    this.fieldNames[this.activeGarden()].schedule.splice(scheduleIndex, 1)
    setTimeout(()=>
    this.drawSchedule(), 10)
  }

  deleteBedVerification(index:number){
    this.activeGarden.set(index)
    setTimeout(()=>{
      this.openModal('deleteModal')
    },5)

  }

  deleteBed(index:number){
    this.fieldNames.splice(index, 1)
    this.closeModal('deleteModal')
  }

  onLastFrost(){
    let rawDate = new Date(this.frostDates[0]+ ' '+ new Date().getFullYear())
    let monthNumber: string|number = rawDate.getMonth() + 1
    if (monthNumber < 10){
      monthNumber = '0' + monthNumber
    }
    let fixedDate = `${rawDate.getFullYear()}-${monthNumber}-${rawDate.getDate()}`
    this.sowForm.controls.plantingTime.setValue(fixedDate)
  }

  untilFirstFrost(){
    // this.sowForm.controls.plantingTime
    // Compare seasonChange with this.currentDate
    let firstFrost = new Date(this.frostDates[1]+ ' ' + new Date().getFullYear())
    let plantTime = new Date(this.sowForm.controls.plantingTime.value!)
    let msCount = firstFrost.valueOf() - plantTime.valueOf()
    let dayCount = msCount / 1000 / 3600 / 24
    let weekCount = dayCount / 7
    this.sowForm.controls.growingTime.setValue(Number(weekCount))
  }

  fallCrop(){
    /* This function suggests a planting time using growing time and frost dates as parameters */
  }

  afterLastCrop(){
    /* This function sets the plantingTime to the day after the end of the last growingTime */
    let lastGrowingTime = new Date('1-1-25')
    for(let crops of this.fieldNames[this.activeGarden()].schedule){
      if(crops.endDate.valueOf() > lastGrowingTime.valueOf()){
        lastGrowingTime = new Date(crops.endDate.valueOf() + 172800000)
      }
    }
    let monthNumber: string|number = lastGrowingTime.getMonth() + 1
    if (monthNumber < 10){
      monthNumber = '0' + monthNumber
    }
    this.sowForm.controls.plantingTime.setValue(`${lastGrowingTime.getFullYear()}-${monthNumber}-${lastGrowingTime.getDate()}`)
  }
}
