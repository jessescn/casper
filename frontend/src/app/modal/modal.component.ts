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

  save(form){

    const { value } = form;

    if(form.status == 'VALID'){ 

        if(this.new._id) {
          
          value._id = this.new._id
        }
      
       this.modalClose.emit(value);
    }
  }

}
