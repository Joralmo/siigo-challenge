import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientsComponent } from './create-clients.component';

describe('CreateClientsComponent', () => {
  let component: CreateClientsComponent;
  let fixture: ComponentFixture<CreateClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
