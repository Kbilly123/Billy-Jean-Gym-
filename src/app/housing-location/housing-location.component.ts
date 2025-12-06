import {Component, input} from '@angular/core';
import {HousingLocationInfo} from '../housinglocation';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  imports: [CommonModule,RouterModule],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation().photo"
        alt="Exterior photo of {{ housingLocation().name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ housingLocation().name }}</h2>
      <p class="listing-location">{{ housingLocation().city }}, {{ housingLocation().state }}</p>

      <a [routerLink]="['/details',housingLocation().id]">Learn More</a>

    </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {
  housingLocation = input.required<HousingLocationInfo>();
}
