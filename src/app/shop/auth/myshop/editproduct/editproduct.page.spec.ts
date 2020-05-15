import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditproductPage } from './editproduct.page';

describe('EditproductPage', () => {
  let component: EditproductPage;
  let fixture: ComponentFixture<EditproductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditproductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
