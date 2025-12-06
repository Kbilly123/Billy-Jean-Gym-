import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input
          type="text"
          placeholder="Search by name, city, or state..."
          [(ngModel)]="filterText"
          name="filterText"
          (input)="filterResults()"
        />
        <button class="primary" type="button" (click)="filterResults()">Search</button>
      </form>
    </section>

    <section class="results">
      @for (housingLocation of filteredHousingList; track $index) {
        <app-housing-location
          [housingLocation]="housingLocation">
        </app-housing-location>
      }
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocationInfo[] = [];
  filteredHousingList: HousingLocationInfo[] = [];
  filterText: string = '';

  housingService: HousingService = inject(HousingService);

  constructor() {
    // Get all housing data
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredHousingList = this.housingLocationList;
  }

  filterResults() {
    const text = this.filterText.toLowerCase().trim();

    if (!text) {
      this.filteredHousingList = this.housingLocationList;
      return;
    }

    // ✅ Filter by name, city, state, or availableUnits
    this.filteredHousingList = this.housingLocationList.filter((location) =>
      location.name.toLowerCase().includes(text) ||
      location.city.toLowerCase().includes(text) ||
      location.state.toLowerCase().includes(text) ||
      String(location.availableUnits).includes(text)
    );
  }
}
