import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  workouts: any[] = [];
  chart: any;
  selectedUser: string = ''; // To filter by name

  constructor(private userService: UserService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.workouts = this.userService.getWorkouts();
    this.createChart();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy(); // Destroy previous chart before creating a new one
    }

    const ctx = document.getElementById('workoutChart') as HTMLCanvasElement;
    const filteredWorkouts = this.selectedUser
      ? this.workouts.filter(w => w.name === this.selectedUser)
      : this.workouts;

    const workoutNames = [...new Set(filteredWorkouts.map(w => w.name))];
    const workoutDurations = workoutNames.map(name =>
      filteredWorkouts
        .filter(w => w.name === name)
        .reduce((total, w) => total + w.duration, 0)
    );

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: workoutNames,
        datasets: [
          {
            label: 'Workout Duration (mins)',
            data: workoutDurations,
            backgroundColor: '#2c5fcf',
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // method for the select dropdown or manual user filter
  filterByUser(event: Event | string) {
    if (typeof event === 'string') {
      this.selectedUser = event;
    } else {
      const selectedValue = (event.target as HTMLSelectElement).value;
      this.selectedUser = selectedValue;
    }
    this.createChart(); 
  }
}
