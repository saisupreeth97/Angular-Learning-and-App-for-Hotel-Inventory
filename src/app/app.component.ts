import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { RoomsService } from './rooms/services/rooms.service';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  // template: `<h1>Hello World</h1>
  // <p>Angular is awseome</p>`,
  styleUrls: ['./app.component.scss'],
  // styles: [`h1 { color: red; }`]
})
export class AppComponent implements OnInit {


  title = 'hotelinverntoryapp';

  role = 'Admin';

  @ViewChild('name', { static: true }) name!: ElementRef;

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {console.log(event)});
    this.router.events.pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => console.log("Navigation Started"));
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => console.log("Navigation Competed"));
    this.loggerService?.log('AppComponent.ngOnInit()');
    this.name.nativeElement.innerText = 'Hiton Hotel';
    this.localStorage.setItem('name', 'Hilton Hotel');
  }

  constructor(@Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: any,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router) {
    console.log(initService.config);
  }

  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
}
