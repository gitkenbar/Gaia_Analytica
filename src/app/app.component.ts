import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: '../styles.scss'
})
export class AppComponent{

  title = 'Gaia Analytica';
  drawBackground(){
    let canvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement
    let ctx = canvas.getContext('2d')
  }
}
