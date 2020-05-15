import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditshopmodalComponent } from './editshopmodal.component';

describe('EditshopmodalComponent', () => {
  let component: EditshopmodalComponent;
  let fixture: ComponentFixture<EditshopmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditshopmodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditshopmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
