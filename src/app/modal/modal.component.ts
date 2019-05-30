import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
  modal: any;

  sizes = {
    small:  'modal_small',
    medium: 'modal_medium',
    large:  'modal_large'
  };
  @Input() modal_size: any = this.sizes.small;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModal() {
    this.modal = this.modalService.open(this.content, {windowClass: this.modal_size});
    this.modal.result.then(() => {
      // when close button is clicked
    },
    () => {
      // when backdrop is clicked
      this.closeInfo();
    });
  }

  closeModal() {
    this.modal.close();
    this.modalClose.next();
  }

  closeAll() {
    this.modalService.dismissAll();
  }

  closeInfo() {
    this.modalClose.next();
  }
}
