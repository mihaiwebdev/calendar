import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { AppointmentModel } from '../../core/models/appointment.model';
import { AppointmentsService } from '../../core/services/appointments.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, MatTableModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly appointmentsService = inject(AppointmentsService);

  public readonly displayedColumns = ['day'];
  public readonly hours = Array.from({ length: 24 }, (_, i) => i + 1);
  public readonly selectedDate = input<Date>(new Date());
  public readonly selectedDateObservable$ = toObservable(this.selectedDate);
  public readonly appointments =
    this.appointmentsService.selectedDayAppointments;

  ngOnInit(): void {
    this.selectedDateObservable$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((date: Date) => {
          this.appointmentsService.getAppointments(date);
        }),
      )
      .subscribe();
  }

  public deleteAppointment(appointment: AppointmentModel): void {
    this.appointmentsService.removeAppointment(appointment);
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.item.element.nativeElement.children.length > 0) {
      this.appointmentsService.updateAppointmentHour(
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
