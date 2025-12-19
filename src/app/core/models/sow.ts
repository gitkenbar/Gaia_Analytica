import { Plant } from "./plant"

export class Sow{
  crop: Plant
  plantingDate: Date
  endDate: Date
  color: string
  constructor(crop:Plant, plantingDate:Date, color:string){
    this.crop = crop,
    this.plantingDate = plantingDate
    this.endDate = new Date((crop.growingTime * 604800000) + plantingDate.valueOf())
    this.color = color
  }
}
