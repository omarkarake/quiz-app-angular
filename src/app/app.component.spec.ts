import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DarkModeService } from './dark-mode.service';
import { AppComponent } from './app.component';

class MockDarkModeService {
  darkMode$ = of(true); // Use a different value to verify the subscription
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let darkModeService: DarkModeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: MatIconRegistry,
          useValue: {
            addSvgIcon: jest.fn() // Mock the addSvgIcon method using jest.fn()
          }
        },
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustResourceUrl: jest.fn((url: string) => url) // Mock the bypassSecurityTrustResourceUrl method
          }
        },
        { provide: DarkModeService, useClass: MockDarkModeService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    darkModeService = TestBed.inject(DarkModeService);
    fixture.detectChanges();
  });

  it('should call ngOnInit and subscribe to dark mode changes and update screen size', () => {
    const updateScreenSizeSpy = jest.spyOn(component, 'updateScreenSize');
    component.ngOnInit();
    expect(component.isDarkMode).toBe(true);
    expect(updateScreenSizeSpy).toHaveBeenCalled();
  });
});
