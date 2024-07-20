import { Observable } from 'rxjs';
import { QuizData, QuizService } from './quiz.service';

describe('QuizService', () => {
  let service: QuizService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
    };
    service = new QuizService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getQuizzes return quizdata observable', () => {
    const res = Observable<QuizData>;
    const dataUrl = '../assets/data.json';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(res);
    service.getQuizzes();
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toBeCalledWith(dataUrl);
  });
});
