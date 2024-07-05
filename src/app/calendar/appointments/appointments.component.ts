import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { tap } from 'rxjs';
import { AmPmPipe } from '../../core/pipes/am-pm.pipe';
import { AppointmentsService } from '../../core/services/appointments.service';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatTableModule,
    AppointmentComponent,
    AmPmPipe,
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  public drop(event: CdkDragDrop<any>, targetHour: number): void {
    const draggedAppointmentId =
      event.item.element.nativeElement.id.split('-')[1];

    this.appointmentsService.updateAppointmentHour(
      Number(draggedAppointmentId),
      targetHour,
    );
  }
}
