import { Component, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppointmentModel } from '../../core/models/appointment.model';
import { AppointmentsService } from '../../core/services/appointments.service';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss',
})
export class CreateAppointmentComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly appointmentsService = inject(AppointmentsService);

  public selectedDate = input(new Date());

  public get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }
  public get hourControl(): FormControl {
    return this.form.get('hour') as FormControl;
  }

  public readonly form = this.formBuilder.group({
    name: ['', Validators.required],
    hour: ['', [Validators.required, Validators.max(24)]],
  });

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const appointmentObject: AppointmentModel = {
      name: this.nameControl.value,
      hour: this.hourControl.value,
      date: this.selectedDate(),
      id: this.appointmentsService.appointments().length,
    };

    this.appointmentsService.addAppointment(appointmentObject);
  }
}
