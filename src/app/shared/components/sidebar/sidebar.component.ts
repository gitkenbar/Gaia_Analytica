import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: '../../../../styles.scss'
})
export class SidebarComponent {
  isSidebarVisible:boolean = false;

  toggleSidebar(){
    this.isSidebarVisible = !this.isSidebarVisible
  }
}
