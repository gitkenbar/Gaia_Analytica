import { AfterViewInit, Component, Input } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { GaiaChart } from '../../models/gaia-chart.model';
@Component({
  selector: 'app-graphcard',
  standalone: true,
  imports: [],
  templateUrl: './graphcard.component.html',
  styleUrl: '../../../../styles.scss'
})
export class GraphcardComponent implements AfterViewInit{
  @Input() chartFromParent!:any

  ngAfterViewInit(): void{
    let chartConfig:ChartConfiguration = this.chartFromParent;
    let chartItem = 'ctx';
    new Chart(chartItem, chartConfig)
  }
}
