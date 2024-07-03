import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    AppointmentsComponent,
    CreateAppointmentComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  public readonly selected = model<Date>(new Date());
}

export default CalendarComponent;
