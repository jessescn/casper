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
                      "description": "" } 

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

      this.new.topic = this.values.topic || this.new.topic;
      this.new.title = this.values.title || this.new.title;
      this.new.image = this.values.image || this.new.image;
      this.new.link = this.values.link || this.new.link;
      this.new.description = this.values.description || this.new.description;
    
    this.modalClose.emit(this.new);
  }

}
