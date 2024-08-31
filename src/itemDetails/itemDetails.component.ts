import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './itemDetails.component.html',
  styleUrl: './itemDetails.component.css'
})
export class AppComponent {
  title = 'bworks';
}
