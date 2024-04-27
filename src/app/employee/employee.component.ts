import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  // providers: [RoomsService] // To provide the service again, because by default service is singleton if use provide is root
})
export class EmployeeComponent implements OnInit {

  empName: String = 'John';

  constructor(/*@Self()*/ private roomsService: RoomsService) { 
  }

  ngOnInit(): void {
  }

}
