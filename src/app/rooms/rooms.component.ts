import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {

  hotelName = 'JW Marriott';

  numberOfRooms = 10;

  hideRooms = false;

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms : 20,
    availableRooms : 10, 
    bookedRooms : 5
  }

  title = 'Room List';

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponenet!: QueryList<HeaderComponent>;

  roomList: RoomList[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.headerComponent.title = "Rooms View";
    this.headerChildrenComponenet.last.title = "Last Titile";
  }

  ngAfterViewChecked(): void {
    
  }

  ngDoCheck(): void {
    console.log('Rooms Component DoCheck');
  }

  ngOnInit(): void {

    // console.log(this.headerComponent);
    this.roomList = [
      {
        roomNumber: 101,
        roomType: 'Deluxe',
        amenities: 'TV, AC, Wifi',
        price: 2000,
        photos: 'https://source.unsplash.com/blue-bed-linen-on-bed-P6B7y6Gnyzw',
        checkinTime: new Date('2021-01-01'),
        checkoutTime: new Date('2021-01-02'),
        rating: 4.36789
      },
      {
        roomNumber: 102,
        roomType: 'Super Deluxe',
        amenities: 'TV, AC, Wifi, Mini Bar',
        price: 3000,
        photos: 'https://source.unsplash.com/white-and-brown-floral-sofa-nRS3ClHbNGQ',
        checkinTime: new Date('2021-01-01'),
        checkoutTime: new Date('2021-01-02'),
        rating: 5
      },
      {
        roomNumber: 103,
        roomType: 'Suite',
        amenities: 'TV, AC, Wifi, Mini Bar, Jacuzzi',
        price: 5000,
        photos: 'https://source.unsplash.com/3d-render-of-luxury-hotel-room-wnA23EFrwNw',
        checkinTime: new Date('2021-01-01'),
        checkoutTime: new Date('2021-01-02'),
        rating: 4.5
      }
    ];
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: 104,
      roomType: 'Suite',
      amenities: 'TV, AC, Wifi, Mini Bar, Jacuzzi',
      price: 5000,
      photos: 'https://source.unsplash.com/3d-render-of-luxury-hotel-room-wnA23EFrwNw',
      checkinTime: new Date('2021-01-01'),
      checkoutTime: new Date('2021-01-02'),
      rating: 4.5
    };
    // this.roomList.push(room);
    this.roomList = [...this.roomList, room];
  }

}
