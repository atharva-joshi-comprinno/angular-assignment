import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Trainer } from './trainer';
import { TrainerService } from '../../core/trainerService';

describe('Trainer', () => {
  let component: Trainer;
  let fixture: ComponentFixture<Trainer>;
  let mockRouter: any;
  let mockTrainerService: any;

  beforeEach(() => {
    mockRouter = { navigate: vi.fn() };
    mockTrainerService = {
      getTrainerName: vi.fn().mockReturnValue('Ash'),
      getCaughtPokemon: vi.fn().mockReturnValue([]),
      removePokemon: vi.fn(),
      logout: vi.fn()
    };

    TestBed.configureTestingModule({
      imports: [Trainer],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: TrainerService, useValue: mockTrainerService }
      ]
    });
    
    fixture = TestBed.createComponent(Trainer);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get trainer name from service on init', () => {
    component.ngOnInit();
    expect(mockTrainerService.getTrainerName).toHaveBeenCalled();
    expect(component.trainerName()).toBe('Ash');
  });

  it('should get caught pokemon from service on init', () => {
    component.ngOnInit();
    expect(mockTrainerService.getCaughtPokemon).toHaveBeenCalled();
    expect(component.caughtPokemon()).toEqual([]);
  });

  it('should logout and navigate to home', () => {
    component.logout();
    
    expect(mockTrainerService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
