export class Plant{
  name: string
  growingTime: number
  defaultColor: string

  constructor(name:string, growingTime: number, defaultColor: string){
    this.name = name,
    this.growingTime = growingTime
    this.defaultColor = defaultColor
  }
}
