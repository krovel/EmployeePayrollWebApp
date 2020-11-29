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
        this._name = name;
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
        this._startDate = startDate;
    }

    get departments() {
        return this._departments;
    }
    set departments(departments) {
        this._departments = departments;
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
    employeePayrollData.name = document.querySelector("#name").value;
    employeePayrollData.gender = document.querySelector("#male").checked ? "M" : "F";
    employeePayrollData.salary = document.querySelector("#salary").value;
    dateString = document.querySelector("#month").value + " " + document.querySelector("#day").value + ", " + document.querySelector("#year").value;
    employeePayrollData.startDate = new Date(dateString);
    let departmentsArray = [];
    document.querySelectorAll("[name=department]").forEach(input => {
        if (input.checked) departmentsArray.push(input.value);
    });
    employeePayrollData.departments = departmentsArray;
    alert("Employee Added Successfully!\n" + employeePayrollData.toString());
}

const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
salary.oninput = function() {
    output.textContent = salary.value;
};