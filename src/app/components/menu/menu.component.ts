import { CallComponentsService } from './../../shared/call-components.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  getContact:boolean = true
  constructor(
    private _router: Router,
    private _callComponents: CallComponentsService
  ) { }

  ngOnInit(): void { }


  createNewGroup(){
    this._callComponents.renderGroupInfo.emit(false)
    this._callComponents.showRooms.emit(false)
    this._callComponents.showContacts.emit(false)
    this._callComponents.addContactGroup.emit(false)
    this._callComponents.showNewGroup.emit(true)
  }

  getContacts(){
    this._callComponents.showRooms.emit(false)
    this._callComponents.showNewGroup.emit(false)
    this._callComponents.showContacts.emit(true)
    this._callComponents.addContactGroup.emit(false);
    this._callComponents.renderGroupInfo.emit(false)
    this._callComponents.getContactAddSituation.emit(false)

  }
  backToIntroPage(){
    this._router.navigate(['/'])
  }
}
