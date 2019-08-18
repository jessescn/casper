import { Component, OnInit, Input,  EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-row-panel',
  templateUrl: './row-panel.component.html',
  styleUrls: ['./row-panel.component.css']
})
export class RowPanelComponent implements OnInit {
 
  @Input('new') notice; 
  @Output() modalOpener = new EventEmitter();
  @Output() removeRow = new EventEmitter();

  confirmation = false;

  constructor() { }

  ngOnInit() {
  }

  openModal(){
    this.modalOpener.emit(this.notice);
  }

  handleRemoveNew(){
    this.closeConfirmation();
    this.removeRow.emit(this.notice);
  }

  closeConfirmation(){
    this.confirmation = false;
  }

  removeNew(){
      this.confirmation  = true;
  }

  formatText(text){
    if(text.length > 40){
      return text.slice(0, 37) + "...";
    }
    return text;
  }

}
