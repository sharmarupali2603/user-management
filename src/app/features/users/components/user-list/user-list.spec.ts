import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { UserList } from './user-list';

describe('UserList', () => {

  let component: UserList;
  let fixture: ComponentFixture<UserList>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [
        provideMockStore({
          initialState: {
            users: {
              users: [],
              loading: false,
              error: null
            }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});