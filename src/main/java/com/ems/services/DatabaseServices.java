package com.ems.services;

import com.ems.EmsApplication;
import com.ems.database.models.*;
import org.bson.types.ObjectId;

import java.util.Optional;

public class DatabaseServices {

    // find employee by id
    public static Optional<Employee> findEmployeeById(ObjectId employeeId) {
        return EmsApplication.visibleEmployeeRepository
                .findAll()
                .stream()
                .filter(employee -> employee.getEmployeeId()
                        .equals(employeeId))
                .findFirst();
    }

    // find location by id
    public static Optional<Location> findLocationById(ObjectId locationId) {
        return EmsApplication.visibleLocationRepository
                .findAll()
                .stream()
                .filter(location -> location.getLocationId()
                        .equals(locationId))
                .findFirst();
    }

    // find manager by id
    public static Optional<Manager> findManagerById(ObjectId managerId) {
        return EmsApplication.visibleManagerRepository
                .findAll()
                .stream()
                .filter(manager -> manager.getManagerId()
                        .equals(managerId))
                .findFirst();
    }

    // find organization by id
    public static Optional<Organization> findOrganizationById(ObjectId organizationId) {
        return EmsApplication.visibleOrganizationRepository
                .findAll()
                .stream()
                .filter(organization -> organization.getOrganizationId()
                        .equals(organizationId))
                .findFirst();
    }

    // find shift by id
    public static Optional<Shift> findShiftById(ObjectId shiftId) {
        return EmsApplication.visibleShiftRepository
                .findAll()
                .stream()
                .filter(shift -> shift.getShiftId()
                        .equals(shiftId))
                .findFirst();
    }

    // save employee
    public static void saveEmployee(Employee employee) {
        EmsApplication.visibleEmployeeRepository.save(employee);
    }

    // save location
    public static void saveLocation(Location location) {
        EmsApplication.visibleLocationRepository.save(location);
    }

    // save manager
    public static void saveManager(Manager manager) {
        EmsApplication.visibleManagerRepository.save(manager);
    }

    // save organization
    public static void saveOrganization(Organization organization) {
        EmsApplication.visibleOrganizationRepository.save(organization);
    }

    // save shift
    public static void saveShift(Shift shift) {
        EmsApplication.visibleShiftRepository.save(shift);
    }

    // delete employee
    public static void deleteEmployee(Employee employee) {
        ObjectId employeeId = employee.getEmployeeId();
        if (EmsApplication.visibleEmployeeRepository.findAll().stream().anyMatch(em -> em.getEmployeeId().equals(employeeId))){
            System.out.println("Employee not found");
            throw new RuntimeException("Error deleting employee! Employee with id: " + employeeId + " is not present in the database");
        }
        EmsApplication.visibleEmployeeRepository.delete(employee);
    }

    // delete location
    public static void deleteLocation(Location location) {
        ObjectId locationId = location.getLocationId();
        if (EmsApplication.visibleLocationRepository.findAll().stream().anyMatch(lo -> lo.getLocationId().equals(locationId))){
            System.out.println("Location not found");
            throw new RuntimeException("Error deleting location! Location with id: " + locationId + " is not present in the database");
        }
        EmsApplication.visibleLocationRepository.delete(location);
    }

    // delete manager
    public static void deleteManager(Manager manager) {
        ObjectId managerId = manager.getManagerId();
        if (EmsApplication.visibleManagerRepository.findAll().stream().anyMatch(ma -> ma.getManagerId().equals(managerId))){
            System.out.println("Manager not found");
            throw new RuntimeException("Error deleting manager! Manager with id: " + managerId + " is not present in the database");
        }
        EmsApplication.visibleManagerRepository.delete(manager);
    }

    // delete organization
    public static void deleteOrganization(Organization organization) {
        ObjectId organizationId = organization.getOrganizationId();
        if (EmsApplication.visibleOrganizationRepository.findAll().stream().anyMatch(or -> or.getOrganizationId().equals(organizationId))){
            System.out.println("Organization not found");
            throw new RuntimeException("Error deleting organization! Organization with id: " + organizationId + " is not present in the database");
        }
        EmsApplication.visibleOrganizationRepository.delete(organization);
    }

    // delete shift
    public static void deleteShift(Shift shift) {
        ObjectId shiftId = shift.getShiftId();
        if (EmsApplication.visibleShiftRepository.findAll().stream().anyMatch(sh -> sh.getShiftId().equals(shiftId))){
            System.out.println("Shift not found");
            throw new RuntimeException("Error deleting shift! Shift with id: " + shiftId + " is not present in the database");
        }
        EmsApplication.visibleShiftRepository.delete(shift);
    }
}
