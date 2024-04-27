import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {

  hotelName = 'JW Marriott';

  numberOfRooms = 10;

  hideRooms = true;

  selectedRoom!: RoomList;

  subscription!: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError(error => {
      // console.log('Error Occured');
      this.error$.next(error.message);
      return of([]);
    })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map(rooms => rooms.length)
  )

  stream = new Observable<String>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('Error');
  });

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  }

  title = 'Room List';

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponenet!: QueryList<HeaderComponent>;

  roomList: RoomList[] = [];

  totalBytes = 0;

  //constructor(private roomsService: RoomsService) - To inject the service

  constructor(@SkipSelf() private roomsService: RoomsService) {
    // this.roomList = this.roomsService.getRooms();
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = "Rooms View";
    console.log(this.headerChildrenComponenet);
    this.headerChildrenComponenet.last.title = "Last title";
  }

  ngAfterViewChecked(): void {

  }

  ngDoCheck(): void {
    console.log('Rooms Component DoCheck');
  }

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe(event => { 
      switch(event.type) {
        case HttpEventType.Sent:
          console.log('Request Sent');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Request Succcess');
          break;
        case HttpEventType.DownloadProgress:
          this.totalBytes+=event.loaded;
          break;
        case HttpEventType.Response:
          console.log(event.body);
          break;
      }
    });
    // console.log(this.headerComponent);
    this.stream.subscribe({
      next: data => console.log(data),
      complete: () => console.log('Completed'),
      error: error => console.log(error)
    });
    this.stream.subscribe(data => console.log(data));
    // this.roomsService.getRooms().subscribe(rooms => {
    //   this.roomList = rooms;
    // })
    // this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });
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
      // roomNumber: '104',
      roomType: 'Suite',
      amenities: 'TV, AC, Wifi, Mini Bar, Jacuzzi',
      price: 5000,
      photos: 'https://source.unsplash.com/3d-render-of-luxury-hotel-room-wnA23EFrwNw',
      checkinTime: new Date('2021-01-01'),
      checkoutTime: new Date('2021-01-02'),
      rating: 4.5
    };
    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe(rooms => {
      this.roomList = rooms;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Suite',
      amenities: 'TV, AC, Wifi, Mini Bar, Jacuzzi',
      price: 5000,
      photos: 'https://source.unsplash.com/3d-render-of-luxury-hotel-room-wnA23EFrwNw',
      checkinTime: new Date('2021-01-01'),
      checkoutTime: new Date('2021-01-02'),
      rating: 4.5
    };
    this.roomsService.editRoom(room).subscribe(rooms => {
      this.roomList = rooms;
    });
  }

  deleteRoom() {  
    this.roomsService.deleteRoom('3').subscribe(rooms => {
      this.roomList = rooms;
    });
  }

  // ngOnDestroy(): void {
  //   if(this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }

}
