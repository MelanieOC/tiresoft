import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MediaqueryService } from 'src/app/services/mediaquery.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
  @Input() title: string
  @Input() return: boolean

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
