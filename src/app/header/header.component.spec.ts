import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DarkModeService } from '../dark-mode.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let darkModeServiceMock: any;

  beforeAll(() => {
    // Mock the matchMedia API globally
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }))
    });
  });

  beforeEach(async () => {
    darkModeServiceMock = {
      darkMode$: of(false),
      setDarkMode: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: DarkModeService, useValue: darkModeServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with system dark mode preference', () => {
    // Adjust the matchMedia mock to simulate dark mode
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true, // Simulate prefers dark mode
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }));

    component.ngOnInit();

    expect(component.isDarkMode).toBe(true);
    expect(darkModeServiceMock.setDarkMode).toHaveBeenCalledWith(true);
  });

  it('should subscribe to dark mode changes', () => {
    darkModeServiceMock.darkMode$ = of(true);

    component.ngOnInit();

    expect(component.isDarkMode).toBe(true);
  });

  it('should toggle dark mode', () => {
    component.isDarkMode = false;
    component.toggleDarkMode();

    expect(component.isDarkMode).toBe(true);
    expect(darkModeServiceMock.setDarkMode).toHaveBeenCalledWith(true);

    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(false);
    expect(darkModeServiceMock.setDarkMode).toHaveBeenCalledWith(false);
  });

  it('should apply dark mode class', () => {
    const addClassSpy = jest.spyOn(document.documentElement.classList, 'add');
    const removeClassSpy = jest.spyOn(document.documentElement.classList, 'remove');

    component.applyDarkMode(true);
    expect(addClassSpy).toHaveBeenCalledWith('dark');

    component.applyDarkMode(false);
    expect(removeClassSpy).toHaveBeenCalledWith('dark');
  });

  it('should add event listener for system dark mode changes', () => {
    const addEventListenerSpy = jest.fn();
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      addEventListener: addEventListenerSpy,
      removeEventListener: jest.fn()
    }));

    component.ngOnInit();
    expect(addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
