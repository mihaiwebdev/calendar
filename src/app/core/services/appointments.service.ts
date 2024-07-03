import { Injectable, signal } from '@angular/core';
import { AppointmentModel } from './../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private readonly state = {
    appointments: signal<AppointmentModel[]>([]),
    selectedDayAppointments: signal<AppointmentModel[]>([]),
  };
  public readonly appointments = this.state.appointments.asReadonly();
  public readonly selectedDayAppointments =
    this.state.selectedDayAppointments.asReadonly();

  public addAppointment(appointment: AppointmentModel): void {
    this.state.appointments.update((state) => [...state, appointment]);

    this.getAppointments(appointment.date);
  }

  public getAppointments(date: Date): void {
    const selectedDayAppointments = this.state
      .appointments()
      .filter(
        (appointment: AppointmentModel) =>
          new Date(appointment.date).toDateString() === date.toDateString(),
      );

    this.state.selectedDayAppointments.set(selectedDayAppointments);
  }

  public removeAppointment(appointment: AppointmentModel) {
    this.state.appointments.update((state) =>
      state.filter(
        (appoitment: AppointmentModel) => appoitment.id !== appointment.id,
      ),
    );

    this.getAppointments(appointment.date);
  }
  public updateAppointmentHour(previousIndex: number, currentIndex: number) {
    this.state.appointments.update((state) => {
      const appointment = state.find(
        (appointment) => appointment.hour === previousIndex + 1,
      );
      if (!appointment) return state;

      appointment.hour = currentIndex + 1;

      return state;
    });
  }
}
