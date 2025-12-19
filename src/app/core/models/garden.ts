import { Sow } from "./sow"
export class Garden{
  name: string
  length: number
  width: number
  schedule: Sow[]
  constructor(name:string, length:number, width:number, schedule: Sow[]){
    this.name = name
    this.length = length,
    this.width = width
    this.schedule = schedule
  }
}
