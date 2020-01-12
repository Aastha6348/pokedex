import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeMonInfoComponent } from './pokemon-info.component';

describe('PokeMonInfoComponent', () => {
  let component: PokeMonInfoComponent;
  let fixture: ComponentFixture<PokeMonInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeMonInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeMonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
