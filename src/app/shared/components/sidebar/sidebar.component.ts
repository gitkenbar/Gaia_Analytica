import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeasonService } from '../../../core/services/season.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: '../../../../styles.scss'
})
export class SidebarComponent {
  date = this.season.getDate();
  seasonLength = this.season.seasonCountdown(['April 14','October 23']);
  nextSeason = this.season.getSeason();

  constructor(
    private season: SeasonService,
  ){}
}
