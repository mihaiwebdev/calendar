import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentModel } from '../../core/models/appointment.model';
import { AppointmentFormComponent } from '../apointment-form/appointment-form.component';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAppointmentComponent {
  private readonly dialog = inject(MatDialog);
  public readonly selectedDate = input(new Date());

  public openDialog(): void {
    this.dialog.open(AppointmentFormComponent, {
      data: { date: this.selectedDate() } as Partial<AppointmentModel>,
    });
  }
}
