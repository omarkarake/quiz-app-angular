import { take } from 'rxjs';
import { DarkModeService } from './dark-mode.service';

describe('DarkModeService', () => {
  let service: DarkModeService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
    };
    service = new DarkModeService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should setDarkMode set darkMode', (done) => {
    const isDarkMode = true;
    service.setDarkMode(isDarkMode);
    service.darkMode$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(isDarkMode);
      done();
    });
  });
});
