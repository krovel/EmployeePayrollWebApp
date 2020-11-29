class EmployeePayrollData {

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        const NAME_REGEX = RegExp("^[A-Z]{1}[a-z]{2,}([ ][A-Z]{1}[a-z]{2,})?$");
        if (NAME_REGEX.test(name)) {
            this._name = name;
        } else throw "Name is Incorrect!";
    }

    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        if (startDate <= new Date()) {
            this._startDate = startDate;
        } else throw "Start Date is Incorrect!";
    }

    get departments() {
        return this._departments;
    }
    set departments(departments) {
        if (departments.length != 0) {
            this._departments = departments;
        } else throw "No Department Entered!";
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = !this.startDate ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "[ id: " + this.id + ", name: " + this.name + ", salary: " + this.salary +
            ", gender: " + this.gender + ", startDate: " + employeeDate + ", departments: " + this.departments + " ]" + "\n";
    }
}

function save() {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = document.querySelector("#name").value;
    } catch (error) {
        alert(error);
        return;
    }
    employeePayrollData.gender = document.querySelector("#male").checked ? "M" : "F";
    employeePayrollData.salary = document.querySelector("#salary").value;
    dateString = document.querySelector("#month").value + " " + document.querySelector("#day").value + ", " + document.querySelector("#year").value;
    try {
        employeePayrollData.startDate = new Date(dateString);
    } catch (error) {
        alert(error);
        return;
    }
    let departmentsArray = [];
    document.querySelectorAll("[name=department]").forEach(input => {
        if (input.checked) departmentsArray.push(input.value);
    });
    try {
        employeePayrollData.departments = departmentsArray;
    } catch (error) {
        alert(error);
        return;
    }
    alert("Employee Added Successfully!\n" + employeePayrollData.toString());
}

const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
salary.oninput = function() {
    output.textContent = salary.value;
};