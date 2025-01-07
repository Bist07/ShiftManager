export const getEmployeesFromShifts = (shifts) => {
    const employees = new Set();
    shifts.forEach(({ employees }) => {
        employees.forEach((employee) => employees.add(employee));
    });
    return Array.from(employees);
}

export const transformEmployeeData = (employees) => {
    return employees.map((employee) => ({
        e_id: employee.e_id,
        name: employee.first_name + " " + employee.last_name,
    }));
}

export const getEmployeeNameFromId = (e_id, employees) => {

    // Find the employee with the matching e_id
    const employee = employees.find(emp => emp.e_id == e_id);

    // If the employee is found, return their full name; otherwise, return a default message
    return employee ? `${employee.name}` : 'Unknown Employee';
}
