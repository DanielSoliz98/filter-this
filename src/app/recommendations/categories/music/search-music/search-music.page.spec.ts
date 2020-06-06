import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchMusicPage } from './search-music.page';

describe('SearchMusicPage', () => {
  let component: SearchMusicPage;
  let fixture: ComponentFixture<SearchMusicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMusicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMusicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
