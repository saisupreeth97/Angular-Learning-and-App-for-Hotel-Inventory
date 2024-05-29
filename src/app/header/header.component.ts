import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'hinv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string = '';

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
  }

}
