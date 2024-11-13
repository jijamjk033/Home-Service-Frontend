import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookingState } from './booking.state';

const getBookingFeatureState = createFeatureSelector<BookingState>('booking');

export const selectServiceId = createSelector(getBookingFeatureState, state => state.serviceId);
export const selectTimeSlotId = createSelector(getBookingFeatureState, state => state.timeSlotId);
export const selectEmployeeId = createSelector(getBookingFeatureState, state => state.employeeId);
export const selectAddress = createSelector(getBookingFeatureState, state => state.address);
