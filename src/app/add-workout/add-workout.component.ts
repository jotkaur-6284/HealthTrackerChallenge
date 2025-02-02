import { Component } from '@angular/core';
import { UserService } from '../user.service'; 
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent {
  workoutName: string = '';
  workoutType: string = 'Yoga'; 
  duration: number = 0;

  constructor(private userService: UserService) {}

  addWorkout() {
    if (this.workoutName && this.workoutType && this.duration > 0) {
      const workout = { 
        name: this.workoutName, 
        type: this.workoutType, 
        duration: this.duration 
      };
console.log("Attempting to add workout:", workout); //  debugging output
      this.userService.addWorkout(workout);
      this.workoutName = '';
      this.workoutType='';
      this.duration = 0;
    }else {
      console.error("Invalid workout input!");
  }
}

}
