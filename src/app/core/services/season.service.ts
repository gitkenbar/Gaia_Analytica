import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class SeasonService {
  // Get date
  currentDate = new Date()
  growingSeason!: string;

  getDate():string{
    return this.currentDate.toDateString()
  }

  seasonCountdown(frostDates: string[]):number{
    // Figure out where in the season we are at so we know what date we are counting down to
    let seasonChange = this.nextFrostDate(this.currentDate, frostDates)
    // Compare seasonChange with this.currentDate
    let msCount = seasonChange.valueOf() - this.currentDate.valueOf()
    let dayCount = msCount / 1000 / 3600 / 24
    // Return # of days until season change
    // Some users may need a different system for monsoon/dry season, and folks outside the USA.
    return Math.floor(dayCount)
  }

  nextFrostDate(today: Date, frostDates:string[]){
    // Checks where in the season the user is in
    // Get the year, will probably be removed when more robust frost dates are added

    let theYear = today.getFullYear()
    // Creates a series of frost dates
    let lastSpringFrost = new Date(frostDates[0] + ' '+ theYear)
    let firstFallFrost = new Date(frostDates[1] + ' '+ theYear)
    let nextSpringFrost = new Date(frostDates[0] + ' '+ (theYear + 1))

    // Compares values of frost date to currentDate in milliseconds to find the next date
    if(lastSpringFrost.valueOf() > today.valueOf()){
      this.growingSeason = 'Frost'
      return lastSpringFrost
    }else if(firstFallFrost.valueOf() > today.valueOf()){
      this.growingSeason = 'Growing'
      return firstFallFrost
    }else{
      this.growingSeason = 'Frost'
      return nextSpringFrost}
  }

  getSeason(){
    return this.growingSeason
  }
}
