import { Component, EventEmitter, Output } from '@angular/core';
import { Router,NavigationStart } from '@angular/router';
import {LoginService} from '../login/loginServices'

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  @Output() menuClicked = new EventEmitter<boolean>();
  showHead:boolean=false;




ngOnInit(){




}

constructor(private router:Router){

  router.events.forEach((event)=>{

    if(event instanceof NavigationStart){

      if(event['url']==('/login'||'/')){

        this.showHead=false;

      }else{

        this.showHead=true;

      }

    }

  });

}
}
