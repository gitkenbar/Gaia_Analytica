import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class SeasonService {
  // Get date
  currentDate = new Date()

  getDate():string{
    return this.currentDate.toDateString()
  }

  getUserZone():string{
    // Get USDA Zone from User
    // Hard coding my zone until back-end set up
    return "7a"
  }

  seasonCountdown():number{
    // Figure out where in the season we are at so we know what date we are counting down to
    let frostDates: string[] = this.getFrostDates(this.getUserZone())
    let seasonChange = this.nextFrostDate(this.currentDate, frostDates)
    // Compare seasonChange with this.currentDate
    let msCount = seasonChange.valueOf() - this.currentDate.valueOf()
    let dayCount = msCount / 1000 / 3600 / 24
    // Return # of days until season change
    // Some users may need a different system for monsoon/dry season, and folks outside the USA.
    return Math.floor(dayCount)
  }

  getFrostDates(hardinessZone: string){
    // Not sure if this is a great way to handle this
    // External API would be great for this, maybe take in a user ZIP code and do a look-up
    // OR if I could use the data from NOAA or other sources I could build out an API on the back-end.
   switch (hardinessZone) {
      case '7a':
        return ['April 14','October 23'];
      default:
        return ['lookup failed', 'lookup failed'];
    }
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
    if(lastSpringFrost.valueOf() > this.currentDate.valueOf()){
      return lastSpringFrost
    }else if(firstFallFrost.valueOf() > this.currentDate.valueOf()){
      return firstFallFrost
    }else{return nextSpringFrost}
  }

  //
}
