import { Component, OnInit } from '@angular/core';
import { Library } from '@core/models/library.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public libraries: Library[] = [
    {
      name: 'Angular material',
      version: '^11.2.2',
    },
    {
      name: 'Ngrx store',
      version: '^11.0.1',
    },
    {
      name: 'Ngrx effects',
      version: '^11.0.1',
    },
    {
      name: 'Ngrx store devtools',
      version: '^11.0.1',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
