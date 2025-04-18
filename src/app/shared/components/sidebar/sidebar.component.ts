import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeasonService } from '../../../core/auth/services/season.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: '../../../../styles.scss'
})
export class SidebarComponent {
  isSidebarVisible:boolean = false;
  date = this.season.getDate();
  seasonLength = this.season.seasonCountdown()
  // usdaZone will come from User
  usdaZone = this.season.getUserZone()
  toggleSidebar(){
    this.isSidebarVisible = !this.isSidebarVisible
  }

  constructor(
    private season: SeasonService,
  ){}
}
