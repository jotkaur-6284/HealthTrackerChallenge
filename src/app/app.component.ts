
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // 
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService] 
})
export class AppComponent {
  title = 'assignment';
  currentview: string = 'health-tracker';

  constructor(private cdr: ChangeDetectorRef) {}

  updateView(newView: string) {
    this.currentview = newView;
    this.cdr.detectChanges();
  }
}


