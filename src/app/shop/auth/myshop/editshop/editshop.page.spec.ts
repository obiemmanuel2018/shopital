import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditshopPage } from './editshop.page';

describe('EditshopPage', () => {
  let component: EditshopPage;
  let fixture: ComponentFixture<EditshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditshopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
