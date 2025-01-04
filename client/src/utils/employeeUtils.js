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