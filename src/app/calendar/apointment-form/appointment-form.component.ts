import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppointmentModel } from '../../core/models/appointment.model';
import { AppointmentsService } from '../../core/services/appointments.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly appointmentsService = inject(AppointmentsService);
  private readonly dialogRef = inject(MatDialogRef<AppointmentFormComponent>);
  private readonly data = inject<Partial<AppointmentModel>>(MAT_DIALOG_DATA);

  public readonly selectedDate = this.data.date;

  public get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }
  public get startControl(): FormControl {
    return this.form.get('start') as FormControl;
  }
  public get endControl(): FormControl {
    return this.form.get('end') as FormControl;
  }

  public readonly form = this.formBuilder.group({
    name: ['', Validators.required],
    start: ['', [Validators.required, Validators.max(24)]],
    end: ['', [Validators.required, Validators.max(24)]],
  });

  ngOnInit() {
    if (!this.selectedDate) {
      this.dialogRef.close;
    }
  }

  public onSubmit(): void {
    if (this.form.invalid || !this.selectedDate) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.startControl.value >= this.endControl.value) {
      this.endControl.setErrors({ invalidEnd: true });
      return;
    }

    const appointmentObject: AppointmentModel = {
      name: this.nameControl.value,
      start: this.startControl.value,
      end: this.endControl.value,
      date: this.selectedDate,
      duration: this.endControl.value - this.startControl.value,
      id: this.appointmentsService.appointments().length,
      color: [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
      ],
    };

    this.appointmentsService.addAppointment(appointmentObject);

    this.dialogRef.close();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
