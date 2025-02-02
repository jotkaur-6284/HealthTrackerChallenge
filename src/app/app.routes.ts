import { Routes } from '@angular/router';
import { ProgressComponent } from './progress/progress.component';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { HealthTrackerComponent } from './health-tracker/health-tracker.component';

export const routes: Routes = [
    {
        path:'progress',
        component:ProgressComponent
    },
    {
        path:'add-workout',
        component:AddWorkoutComponent
    },
    
    {
        path:'health-track',
        component:HealthTrackerComponent
    }
];
