
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private workouts: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) { 
      const storedWorkouts = localStorage.getItem('workouts');
      this.workouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];
    }
  }

  addWorkout(workout: any) {
    this.workouts.push(workout);

    if (isPlatformBrowser(this.platformId)) { 
      localStorage.setItem('workouts', JSON.stringify(this.workouts));
    }
  }

  getWorkouts() {
    return this.workouts;
  }
}



   

