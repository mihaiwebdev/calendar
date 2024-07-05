import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AppointmentModel } from '../../core/models/appointment.model';
import { AppointmentsService } from '../../core/services/appointments.service';
import { AmPmPipe } from '../../core/pipes/am-pm.pipe';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [AmPmPipe, TitleCasePipe],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent {
  private readonly appointmentsService = inject(AppointmentsService);
  public readonly appointment = input.required<AppointmentModel>();

  public deleteAppointment(): void {
    this.appointmentsService.removeAppointment(this.appointment());
  }

  public getAppointmentColor(): string {
    return `rgb(${this.appointment().color.join(', ')})`;
  }
}
