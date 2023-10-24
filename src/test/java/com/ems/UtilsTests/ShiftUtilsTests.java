package com.ems.UtilsTests;

import com.ems.Utils.ShiftUtils;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ShiftUtilsTests {

    @Test
    public void testGetDatesBetweenTwoDates(){
        {
            // 2023/01/01 - 2023/01/31
            final LocalDate startDate = LocalDate.of(2023, 1, 1);
            final LocalDate endDate = LocalDate.of(2023, 1, 31);
            final List<LocalDate> datesBetween = ShiftUtils.getDatesBetweenTwoDates(startDate, endDate);
            assertEquals(31, datesBetween.size());
        }
        {
            // 2023/01/01 - 2023/01/01
            final LocalDate startDate = LocalDate.of(2023, 1, 1);
            final LocalDate endDate = LocalDate.of(2023, 1, 1);
            final List<LocalDate> datesBetween = ShiftUtils.getDatesBetweenTwoDates(startDate, endDate);
            assertEquals(1, datesBetween.size());
        }
        {
            // 2023/01/01 - 2023/12/31
            final LocalDate startDate = LocalDate.of(2023, 1, 1);
            final LocalDate endDate = LocalDate.of(2023, 12, 31);
            final List<LocalDate> datesBetween = ShiftUtils.getDatesBetweenTwoDates(startDate, endDate);
            assertEquals(365, datesBetween.size());
        }
    }

    @Test
    public void testRemoveUnwantedDaysOfTheWeek(){
        {
            // 2023/01/01 - 2023/01/31 want Monday, Wednesday, Friday
            final LocalDate startDate = LocalDate.of(2023, 1, 1);
            final LocalDate endDate = LocalDate.of(2023, 1, 31);
            final List<LocalDate> datesBetween = ShiftUtils.getDatesBetweenTwoDates(startDate, endDate);
            final List<Integer> daysOfWeek = List.of(1, 3, 5);
            final List<LocalDate> filteredDates = ShiftUtils.removeUnwantedDaysOfTheWeek(datesBetween, daysOfWeek);
            assertEquals(13, filteredDates.size());
        }
        {
            // 2023/01/01 - 2023/02/01 want Monday, Wednesday, Friday
            final LocalDate startDate = LocalDate.of(2023, 1, 1);
            final LocalDate endDate = LocalDate.of(2023, 2, 1);
            final List<LocalDate> datesBetween = ShiftUtils.getDatesBetweenTwoDates(startDate, endDate);
            final List<Integer> daysOfWeek = List.of(1, 3, 5);
            final List<LocalDate> filteredDates = ShiftUtils.removeUnwantedDaysOfTheWeek(datesBetween, daysOfWeek);
            assertEquals(14, filteredDates.size());
        }
    }

    @Test
    public void testRemoveUnwantedDatesBasedOnOccurrences(){
        {
            // 2023/01/01 - 2023/01/31 want weekly
            final LocalDate startDate = LocalDate.of(2023, 1, 1);
            final LocalDate endDate = LocalDate.of(2023, 1, 31);
            final List<LocalDate> datesBetween = ShiftUtils.getDatesBetweenTwoDates(startDate, endDate);
            final int repeatsEvery = 1;
            final List<LocalDate> filteredDates = ShiftUtils.removeUnwantedDatesBasedOnOccurrences(datesBetween, repeatsEvery);
            assertEquals(31, filteredDates.size());
        }
        {
            // 2023/01/01 -> 2023/01/31 want biweekly
            final LocalDate startDate = LocalDate.of(2023, 1, 1);
            final LocalDate endDate = LocalDate.of(2023, 1, 31);
            final List<LocalDate> datesBetween = ShiftUtils.getDatesBetweenTwoDates(startDate, endDate);
            final int repeatsEvery = 2;
            final List<LocalDate> filteredDates = ShiftUtils.removeUnwantedDatesBasedOnOccurrences(datesBetween, repeatsEvery);
            assertEquals(15, filteredDates.size());
        }
        {
            // 2023/01/01 -> 2023/02/28 want monthly
            final LocalDate startDate = LocalDate.of(2023, 1, 1);
            final LocalDate endDate = LocalDate.of(2023, 2, 28);
            final List<LocalDate> datesBetween = ShiftUtils.getDatesBetweenTwoDates(startDate, endDate);
            final int repeatsEvery = 3;
            final List<LocalDate> filteredDates = ShiftUtils.removeUnwantedDatesBasedOnOccurrences(datesBetween, repeatsEvery);
            assertEquals(8, filteredDates.size());
        }
    }
}
