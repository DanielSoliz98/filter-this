import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchBooksPage } from './search-books.page';

describe('SearchBooksPage', () => {
  let component: SearchBooksPage;
  let fixture: ComponentFixture<SearchBooksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBooksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
