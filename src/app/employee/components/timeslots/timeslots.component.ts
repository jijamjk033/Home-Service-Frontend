import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employeeService.service';
import { NgFor, NgIf } from '@angular/common';
import { timeSlotsResponse } from '../../interface/employeeInterface';

@Component({
  selector: 'app-timeslots',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,NgFor],
  templateUrl: './timeslots.component.html',
  styleUrl: './timeslots.component.css'
})
export class TimeslotsComponent implements OnInit {
  timeSlotForm!: FormGroup;
  timeSlots: any[] = [];
  isAddSlotModalVisible = false;
  employeeId: string = '';
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.timeSlotForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    this.employeeId = localStorage.getItem('employee_id') || '';
    this.loadExistingTimeSlots();
  }

  loadExistingTimeSlots(): void {
    this.employeeService.getTimeSlots(this.employeeId).subscribe(
      (response: any) => {
        console.log('Time slots response:', response);
        if (response.success) {
          this.timeSlots = response.data;
        } else {
          console.error('Error: No time slots found');
        }
      },
      (error) => {
        console.error('Error fetching time slots:', error);
      }
    );
  }

  formatTimeSlot(slot: timeSlotsResponse): string {
    const date = new Date(slot.date);
    const formattedDate = 
      ('0' + date.getDate()).slice(-2) + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      date.getFullYear();
    
    const startTime = this.formatTime(slot.startTime);
    const endTime = this.formatTime(slot.endTime);
    
    return `${formattedDate},  ${startTime} - ${endTime}`;
  }
  
  private formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; 
    return `${('0' + formattedHours).slice(-2)}:${('0' + minutes).slice(-2)} ${period}`;
  }
  
  

  showAddSlotModal(): void {
    this.isAddSlotModalVisible = true;
  }

  hideAddSlotModal(): void {
    this.isAddSlotModalVisible = false;
  }

  onSubmit(): void {
    if (this.timeSlotForm.invalid) {
      return;
    }

    const payload = {
      employeeId: this.employeeId,
      startDate: this.timeSlotForm.value.startDate,
      endDate: this.timeSlotForm.value.endDate,
      startTime: this.timeSlotForm.value.startTime,
      endTime: this.timeSlotForm.value.endTime
    };

    this.employeeService.createTimeSlots(payload).subscribe(
      (response) => {
        console.log('Time slots created:', response);
        this.hideAddSlotModal();
        this.loadExistingTimeSlots();
      },
      (error) => {
        console.error('Error creating time slots:', error);
      }
    );
  }

  deleteAllSlots() {
    if (confirm('Are you sure you want to delete all slots? This action cannot be undone.')) {
      this.employeeService.deleteAllSlots(this.employeeId).subscribe(
        () => {
          alert('All slots have been deleted.');
          this.timeSlots = [];
          this.loadExistingTimeSlots();
        },
        (error) => {
          console.error('Error deleting slots', error);
          alert('There was an error deleting the slots.');
        }
      );
    }
  }

  deleteTimeSlot(slotId: string) {
    if (confirm('Are you sure you want to delete this time slot?')) {
      this.employeeService.deleteSlotById(slotId).subscribe(
        () => {
          this.timeSlots = this.timeSlots.filter(slot => slot._id !== slotId);
          this.loadExistingTimeSlots();
          alert('Time slot deleted successfully.');
        },
        (error) => {
          console.error('Error deleting time slot', error);
          alert('There was an error deleting the time slot.');
        }
      );
    }
  }
}
