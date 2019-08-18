import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css','./animation.css']
})
export class ModalComponent implements OnInit {

  @Input('openModal') openModal;
  @Input('new') new;
  @Input('modalTitle') modalTitle;
  @Output() modalClose = new EventEmitter();

  values = { "topic":"",
                      "title": "",
                      "image": "",
                      "link" : "",
                      "description": ""} 

  constructor() {
  }
  
  ngOnInit() {
  }
  
  closeModal(){     
    this.modalClose.emit(null);
  }

  handleClick(event){
    event.stopPropagation();
  }

  save(){ 
    console.log(this.values);
    
    this.modalClose.emit(this.values);
  }

}
