package com.ems.services;
import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.Utils.JsonUtils;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import com.sun.jdi.ObjectCollectedException;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

public class EmployeeServices {
    public static Object[] assignShiftToEmployeeUsingIDS(final ObjectId pEmployeeID, final ObjectId pShiftID) throws SvcException, DatabaseException{
        // create necessary objects using IDs
        Employee employee = DatabaseServices.findEmployeeById(pEmployeeID)
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_EMPLOYEE, pEmployeeID));
        Shift shift = DatabaseServices.findShiftById(pShiftID)
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_SHIFT, pShiftID));
        Organization organization = DatabaseServices.findOrganizationById(employee.getOrganizationId())
                .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_ORGANIZATION, employee.getOrganizationId()));

        return assignShiftToEmployeeUsingIDS(employee, shift, organization);
    }

    public static Object[] assignShiftToEmployeeUsingIDS(final Employee pEmployee, final Shift pShift, final Organization pOrganization) throws SvcException {
        // validation
        ValidationServices.validateEmployeeCanConnectToShift(pEmployee, pShift, pOrganization);

        // adding the shift to the employee and changing its status
        List<ObjectId> resultList = new ArrayList<>(List.copyOf(pEmployee.getShiftIdList()));
        resultList.add(pShift.getShiftId());
        pEmployee.setShiftIdList(resultList);
        pShift.setShiftOpen(false);
        return new Object[]{pEmployee, pShift};
    }

    public static ResponseEntity createEmployee(final HttpMethod pMethod, final URI pUrl, final String pBody) {
        // todo: figure out what method and url mean

        Employee employee;
        try{
            employee = JsonUtils.getEmployeeFromJSON(new JSONObject(pBody));
        } catch (SvcException | JSONException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());

        }

        try {
            ValidationServices.validateCreateEmployee(employee);
        }
        catch (SvcException e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try{
            DatabaseServices.saveEmployee(employee);
        } catch (DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        return ResponseEntity.status(200).body("Employee created successfully");
    }

    public static ResponseEntity deleteEmployee(final HttpMethod pMethod, final URI pUrl, final String pBody) {

        Employee employee;
        ObjectId employeeId;
        try {
            employeeId = JsonUtils.getEmployeeIdFromJSON(new JSONObject(pBody));
        }
        catch (SvcException | JSONException e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try{
            employee = DatabaseServices.findEmployeeById(employeeId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_EMPLOYEE, employeeId));
        } catch (DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try {
            ValidationServices.validateDeleteEmployee(employee);
        }
        catch (SvcException e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }

        try{
            DatabaseServices.deleteEmployee(employee);
        } catch (DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
        return ResponseEntity.status(200).body("Employee deleted successfully");
    }
}
