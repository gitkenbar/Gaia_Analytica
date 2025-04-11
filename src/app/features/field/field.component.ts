import { Component } from '@angular/core';
import { GraphcardComponent } from '../../shared/components/graphcard/graphcard.component';
import { GaiaChart } from '../../shared/models/gaia-chart.model';
import { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [GraphcardComponent],
  templateUrl: './field.component.html',
  styleUrl: '../../../styles.scss'
})
export class FieldComponent {
  fieldNames:string[]= ['field001', 'field002', 'apple garden', 'redbud garden', 'uphill001']
  productionChart:ChartConfiguration={
    type: 'pie',
    data: {
      labels: [
        'Lettuce',
        'Spinach',
        'Carrots'
      ],
      datasets: [{
        label: 'Field Layout Overview',
        data: [300, 50, 100],
        backgroundColor: [
          'lightgreen',
          'darkgreen',
          'orange'
        ],
        hoverOffset: 4
      }]
    }
  };
}
