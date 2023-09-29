package com.ems.database.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;
import java.util.stream.Collectors;

@Document(collection = "employees")
public class Employee {

    @Id
    private ObjectId employeeId;
    @Field
    private String employeeName;

    private String firstName;
    @Field
    private String lastName;
    @Field
    private String employeeEmail;
    @Field
    private String employeePhoneNumber;
    @Field
    private String employeeType;
    @Field
    private double loggedHours;
    @Field
    private double pay;
    @Field
    private ObjectId organizationId;
    @Field
    private List<Location> locationList;
    @Field
    private List<ObjectId>  shiftIdList;
    @Field
    private List<Shift> assignedShifts;
    public Employee() {
    }

    public Employee(ObjectId employeeId, String firstName, String lastName, String employeeEmail, String employeePhoneNumber, String employeeType, double loggedHours, double pay, ObjectId organizationId, List<Location> locationList, List<ObjectId> shiftIdList) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeEmail = employeeEmail;
        this.employeePhoneNumber = employeePhoneNumber;
        this.employeeType = employeeType;
        this.loggedHours = loggedHours;
        this.pay = pay;
        this.organizationId = organizationId;
        this.locationList = locationList;
        this.shiftIdList = shiftIdList;
    }

    public Employee(String firstName, String lastName, String employeeEmail, String employeePhoneNumber, String employeeType, double loggedHours, double pay, ObjectId organizationId, List<Location> locationList, List<ObjectId> shiftIdList) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeEmail = employeeEmail;
        this.employeePhoneNumber = employeePhoneNumber;
        this.employeeType = employeeType;
        this.loggedHours = loggedHours;
        this.pay = pay;
        this.organizationId = organizationId;
        this.locationList = locationList;
        this.shiftIdList = shiftIdList;
    }

    public void setEmployeeId(ObjectId employeeId) {
        this.employeeId = employeeId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }

    public void setEmployeePhoneNumber(String employeePhoneNumber) {
        this.employeePhoneNumber = employeePhoneNumber;
    }

    public void setEmployeeType(String employeeType) {
        this.employeeType = employeeType;
    }

    public void setLoggedHours(double loggedHours) {
        this.loggedHours = loggedHours;
    }

    public void setPay(double pay) {
        this.pay = pay;
    }

    public void setOrganizationId(ObjectId organizationId) {
        this.organizationId = organizationId;
    }

    public void setLocationList(List<Location> locationList) {
        this.locationList = locationList;
    }

    public void setShiftIdList(List<ObjectId> shiftIdList) {
        this.shiftIdList = shiftIdList;
    }

    public ObjectId getEmployeeId() {
        return employeeId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmployeeEmail() {
        return employeeEmail;
    }

    public String getEmployeePhoneNumber() {
        return employeePhoneNumber;
    }

    public String getEmployeeType() {
        return employeeType;
    }

    public double getLoggedHours() {
        return loggedHours;
    }

    public double getPay() {
        return pay;
    }

    public ObjectId getOrganizationId() {
        return organizationId;
    }

    public List<Location> getLocationList() {
        return locationList;
    }

    public List<ObjectId> getShiftIdList() {
        return shiftIdList;
    }

    public List<Shift> getAssignedShifts() {
        return assignedShifts;
    }

    public List<Shift> getAssignedShifts(List<Shift> allShifts) {
        List<ObjectId> assignedShiftIds = getShiftIdList();
        return allShifts.stream()
                .filter(shift -> assignedShiftIds.contains(shift.getShiftId()))
                .collect(Collectors.toList());
    }

    @Override
    public String toString() {
        return "Employee{" +
                "employeeId=" + employeeId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", employeeEmail='" + employeeEmail + '\'' +
                ", employeePhoneNumber='" + employeePhoneNumber + '\'' +
                ", employeeType='" + employeeType + '\'' +
                ", loggedHours=" + loggedHours +
                ", pay=" + pay +
                ", organizationId=" + organizationId +
                ", locationIdList=" + locationList +
                ", shiftIdList=" + shiftIdList +
                ", assignedShifts=" + assignedShifts +
                '}';
    }
}
