import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-component-version',
  templateUrl: './component-version.component.html',
  styleUrls: ['./component-version.component.scss']
})
export class ComponentVersionComponent implements OnInit {

  constructor() { }

  currentApplicationVersion = environment.appVersion;

  ngOnInit(): void {
  }

}
