import { CapitalizePipe } from './capitalize-pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(()=>{
    pipe = new CapitalizePipe();
  });

  it('should create',()=>{
    expect(pipe).toBeTruthy();
  });

  it('should capatalize first letter of word',()=>{
    expect(pipe.transform('pikachu')).toBe('Pikachu');
  });

  it('should handle empty string',()=>{
    expect(pipe.transform('')).toBe('');
  })


});
