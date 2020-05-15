import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-imagemodal',
  templateUrl: './imagemodal.component.html',
  styleUrls: ['./imagemodal.component.scss'],
})
export class ImagemodalComponent implements OnInit {
@Input() imageUrl: string;
  constructor(private modalCtr: ModalController) { }

  ngOnInit() {
    console.log(this.imageUrl);
    
  }
onClose(){
  this.modalCtr.dismiss()
}

}
