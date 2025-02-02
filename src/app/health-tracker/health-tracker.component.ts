import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { UserService } from '../user.service';

@Component({
  selector: 'app-health-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './health-tracker.component.html',
  styleUrls: ['./health-tracker.component.css']
})
export class HealthTrackerComponent implements OnInit {
  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  searchQuery: string = '';
  selectedType: string = '';
  currentPage: number = 1;
  pageSize: number = 5; // items per page
  totalPages = 0;  

  get paginatedWorkouts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredWorkouts.slice(startIndex, startIndex + this.pageSize);
  
  }
  setPage(page: number) {
    this.currentPage = page;
  }
  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.workouts = this.userService.getWorkouts();
    this.filteredWorkouts = [...this.workouts]; // 
    this.cdr.detectChanges();
    
    this.cdr.detectChanges();
  }

  filterWorkouts() {
    
  console.log('Filtering workouts', this.searchQuery, this.selectedType); // Debugging log
    this.filteredWorkouts = this.workouts.filter(workout => {
      return (
        (this.searchQuery === '' || workout.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (this.selectedType === '' || workout.type === this.selectedType)
      );
    });
    this.cdr.detectChanges(); 
    this.calculateTotalPages();
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredWorkouts.length / this.pageSize);
  }

  
}




  