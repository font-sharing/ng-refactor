import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import TimeProvider from './../../domain/timeProvider';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('hide cake if not birthday', () => {
    // assert
    const expected = 'Tim';
    component.profile = {name: 'Tim', birthday: {month: 6, day: 1}};
    TimeProvider.now = () => new Date('2018-06-02');
    // act
    const actual = component.profileCaption();
    // assert
    expect(actual).toEqual(expected);
  });


  it('show cake', () => {
    // assert
    const expected = 'Tim🎂';
    component.profile = {name: 'Tim', birthday: {month: 6, day: 1}};
    TimeProvider.now = () => new Date('2018-06-01');
    // act
    const actual = component.profileCaption();
    // assert
    expect(actual).toEqual(expected);
  });
});
