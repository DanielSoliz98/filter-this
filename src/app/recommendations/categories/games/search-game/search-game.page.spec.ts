import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchGamePage } from './search-game.page';

describe('SearchGamePage', () => {
  let component: SearchGamePage;
  let fixture: ComponentFixture<SearchGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchGamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
