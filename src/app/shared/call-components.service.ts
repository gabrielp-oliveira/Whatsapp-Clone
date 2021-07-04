import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallComponentsService {

  constructor(private _http: HttpClient) { }

  private readonly _root: string = 'http://localhost:8080';
  private readonly _addContact: string = 'http://localhost:8080/contact/addContact';
  private readonly _getcontact: string = 'http://localhost:8080/contact/getContact';
  private readonly _deleteContact: string = 'http://localhost:8080/contact/deleteContact';
  private readonly _newGroup: string = 'http://localhost:8080/group/newGroup';
  private readonly _groupParticipants: string = 'http://localhost:8080/group/groupParticipants';
  private readonly _removefromgroup: string = 'http://localhost:8080/group/removefromgroup';
  private readonly _changeGroupInfo: string = 'http://localhost:8080/group/changeGroupInfo';
  private readonly _concedAdmAtatus: string = 'http://localhost:8080/group/concedAdmAtatus';
  private readonly _AddIngroup: string = 'http://localhost:8080/group/addingroup';
  private readonly _leaveRoom: string = 'http://localhost:8080/group/leaveRoom';
  private readonly _groupMessages: string = 'http://localhost:8080/group/groupMessages';
  private readonly _newPrivateChat: string = 'http://localhost:8080/private/newPrivateChat';

  showNewGroup = new EventEmitter<boolean>();
  showContacts = new EventEmitter<boolean>();
  showRooms = new EventEmitter<boolean>();
  room_Id = new EventEmitter<string>();
  room_Name = new EventEmitter<boolean>();
  exitPage= new EventEmitter<boolean>(false)
  newContact= new EventEmitter<boolean>()
  getGroupParticipantsList= new EventEmitter<String>()
  getNewGroupParticipant= new EventEmitter<boolean>()
  renderGroupInfo= new EventEmitter<boolean>()
  addContactGroup= new EventEmitter<boolean>()
  getContactAddSituation= new EventEmitter<boolean>()
  user_Name:string
  user_Email:string
  startRoomId :String


  addContacts( email:string){
    return this._http.post(this._addContact, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      email
    })
  }

  getContacts(){

    return this._http.post(this._getcontact, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
    })

  }

  addNewGroup(room: any){
    return this._http.post(this._newGroup, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      room
    })
  }
  getGroupMessages(id: string){
    return this._http.post(this._groupMessages, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      chatId: id
    })

  }


  addNewPrivateChat(contactId: any){
    return this._http.post(this._newPrivateChat, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      contactId,
      email: this.user_Email,
      name: this.user_Name

    })
  }

  deleteContact(privateChatId:any){
    return this._http.post(this._deleteContact, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      privateChatId
    })
  }
  LeaveGroup(GroupID){
    return this._http.post(this._leaveRoom, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      GroupID
    })
  }
  getGroupParticipants(GroupID){
    return this._http.post(this._groupParticipants, {
      token: `Bearer ${localStorage.token}`,
      GroupID
    })
  }

  removefromgroup(groupId:any, userEmail:string){
    return this._http.post(this._removefromgroup, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      groupId,
      userEmail : this.user_Email,
      contactEmail : userEmail
    })
  }

  AddIngroup(groupId:any, userId:string){
    return this._http.post(this._AddIngroup, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      groupId,
      userId,
    })
  }
  changeGroupInfo(groupInfo:any){
    return this._http.post(this._changeGroupInfo, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      groupInfo,
    })
  }
  concedAdmAtatus(participantInfo:any){
    return this._http.post(this._concedAdmAtatus, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      participantInfo,
    })
  }

}
