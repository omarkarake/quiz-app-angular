import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreComponent } from './score.component';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit play again to start the game again', ()=>{
    const emitSpy = jest.spyOn(component.playAgain, 'emit');
    component.onPlayAgain();
    expect(emitSpy).toHaveBeenCalled();
  })
});
