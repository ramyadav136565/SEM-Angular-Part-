import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'sem';
    menuClicked: any;
    showHead: boolean = false;
    currentRoute: string;
    ngOnInit() { }
    constructor(private router: Router) {
        this.currentRoute = "";
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.currentRoute = event.url;
                if (this.currentRoute == ('/')) {
                    this.showHead = false;
                } else if (this.currentRoute == ('/login')) {
                    this.showHead = false;
                } else if (this.currentRoute == ('/login/register')) {
                    this.showHead = false;
                }
                else {
                    this.showHead = true;
                }
            }
            if (event instanceof NavigationEnd) {
                this.currentRoute = event.url;
                if (this.currentRoute == ('/')) {
                    this.showHead = false;
                } else if (this.currentRoute == ('/login')) {
                    this.showHead = false;
                } else if (this.currentRoute == ('/login/register')) {
                this.showHead = false; 
                 } else {
                    this.showHead = true;
                }
            }
            if (event instanceof NavigationError) {
                if (event.url == ('/' || '/login'||'/login/register')) {
                    this.showHead = false;
                }
            }
        });
    }
}
