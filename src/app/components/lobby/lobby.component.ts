import { MatDialog } from '@angular/material/dialog';
import { CallComponentsService } from './../../shared/call-components.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticateService } from 'src/app/shared/authenticate.service';
import { NewContactComponent } from '../new-contact/new-contact.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
})
export class LobbyComponent implements OnInit {
  rooms: object[];
  contactsList: object[];

  newgroup: boolean = false;
  contacts: boolean = false;
  getChats: boolean = true;
  exitPage: boolean = false;
  privateChats: [];
  constructor(
    private _auth: AuthenticateService,
    private _callComponents: CallComponentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this._auth.showHeaderEmitter.emit(false);
    }, 0);

    this._callComponents.showNewGroup.subscribe((show) => {
      this.newgroup = show;
    });
    this._callComponents.showContacts.subscribe((show) => {
      this.contacts = show;
      if (show) {
        this._callComponents.getContacts().subscribe((data: any) => {
          this.contactsList = data.User.contacts;
          console.log(data);
        });
      }
    });
    this._callComponents.showRooms.subscribe((show) => {
      this.getUserChats();
      this.getChats = show;
    });
    this._callComponents.newContact.subscribe((data) => {
      this._callComponents.getContacts().subscribe((data: any) => {
        this.contactsList = data.User.contacts;
      });
    });
    this._callComponents.exitPage.subscribe((data) => {
      this.exitPage = data;
      if (data == false) {
        this._callComponents.getContacts().subscribe((data: any) => {
          this.contactsList = data.User.contacts;
        });
      }
    });

    this.getUserChats();
  }

  openDialogForm(): void {
    const dialogRef = this.dialog.open(NewContactComponent, {
      width: '500px',
    });
  }
  cancelNewGroup() {
    this._callComponents.showRooms.emit(true);
    this._callComponents.showContacts.emit(false);
    this._callComponents.showNewGroup.emit(false);
  }

  getUserChats() {
    this._auth.authenticate().subscribe((data: any) => {
      if (data.error) {
        localStorage.clear();
      } else {
        this.privateChats = data.privateChatIds;
        this.rooms = data.Rooms;
        this._callComponents.user_Name = data.name;
        this._callComponents.user_Email = data.email;
      }
    });
  }

  getGroupId(id: string) {
    this._callComponents.startRoomId = id;

    this._callComponents.room_Id.emit(id);
    this._callComponents.exitPage.emit(true);
  }

  createPrivateChat(contactID) {
    this._callComponents.addNewPrivateChat(contactID).subscribe((data: any) => {
      this.getGroupId(data.chatId);
    });
  }
  deleteContact(contactID) {
    this._callComponents.deleteContact(contactID).subscribe((data: any) => {
      console.log(data);
      if (data.ok) {
        document.location.reload();
      }
    });
  }
}
