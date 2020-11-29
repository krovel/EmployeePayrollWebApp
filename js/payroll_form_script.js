let isUpdate = false;
let employeePayrollObject = {};

window.addEventListener("DOMContentLoaded", () => {

    const name = document.querySelector("#name");
    const nameError = document.querySelector(".name-error");
    const validName = document.querySelector(".valid-name");
    if (name) {
        name.addEventListener("input", function() {
            if (name.value.length == 0) {
                nameError.textContent = "";
                validName.textContent = "";
            } else {
                try {
                    (new EmployeePayrollData).name = name.value;
                    nameError.textContent = "";
                    validName.textContent = '✓';
                    document.querySelector(".submitButton").disabled = false;
                } catch (error) {
                    nameError.textContent = error;
                    validName.textContent = "";
                    document.querySelector(".submitButton").disabled = true;
                }
            }
        });
    }

    const startDate = document.querySelector("#startDate");
    const startDateError = document.querySelector(".startDate-error");
    const validStartDate = document.querySelector(".valid-startDate");
    if (startDate) {
        startDate.addEventListener("input", function() {
            try {
                let dateString = document.querySelector("#month").value + " " + document.querySelector("#day").value + ", " + document.querySelector("#year").value;
                (new EmployeePayrollData).startDate = new Date(dateString);
                startDateError.textContent = "";
                validStartDate.textContent = '✓';
                document.querySelector(".submitButton").disabled = false;
            } catch (error) {
                startDateError.textContent = error;
                validStartDate.textContent = "";
                document.querySelector(".submitButton").disabled = true;
            }
        });
    }

    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    if (salary) {
        salary.oninput = function() {
            output.textContent = salary.value;
        };
    }

    checkForUpdate();
});

const save = () => {
    try {
        let employeePayrollData = createEmployeePayrollObject();
        if (employeePayrollData != undefined) updateLocalStorage(employeePayrollData);
    } catch (submitError) {
        alert(submitError);
        return;
    }
};

const createEmployeePayrollObject = () => {
    let employeePayrollData = new EmployeePayrollData();

    employeePayrollData.name = getValue("#name");
    employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
    employeePayrollData.profilePicture = getSelectedValues("[name=profile]").pop();
    employeePayrollData.salary = getValue("#salary");
    dateString = document.querySelector("#month").value + " " + document.querySelector("#day").value + ", " + document.querySelector("#year").value;
    employeePayrollData.startDate = new Date(dateString);
    employeePayrollData.note = getValue("#notes");
    try {
        employeePayrollData.departments = getSelectedValues("[name=department]");
    } catch (error) {
        alert(error);
        return;
    }
    employeePayrollData.id = createEmployeeId();
    alert("Employee Added Successfully!\n" + employeePayrollData.toString());
    return employeePayrollData;
};

const getSelectedValues = (propertyName) => {
    let allValues = document.querySelectorAll(propertyName);
    let selectedValues = [];
    allValues.forEach(input => {
        if (input.checked) selectedValues.push(input.value);
    });
    return selectedValues;
};

const getValue = (propertyId) => {
    let value = document.querySelector(propertyId).value;
    return value;
};

function updateLocalStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData];
    }
    alert("Local Storage Updated Successfully!\nTotal Employees : " + employeePayrollList.length);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeeId = () => {
    let employeeId = localStorage.getItem("EmployeeID");
    employeeId = !employeeId ? 1 : (parseInt(employeeId) + 1).toString();
    localStorage.setItem("EmployeeID", employeeId);
    return employeeId;
};

const setForm = () => {
    setValue("#name", employeePayrollObject._name);
    setSelectedValues("[name=profile]", employeePayrollObject._profilePicture);
    setSelectedValues("[name=gender]", employeePayrollObject._gender);
    setSelectedValues("[name=department]", employeePayrollObject._departments);
    setRange("#salary", ".salary-output", employeePayrollObject._salary);
    setValue("#notes", employeePayrollObject._note);
    let date = stringifyDate(employeePayrollObject._startDate).split(" ");
    setValue("#day", date[0]);
    setValue("#month", date[1]);
    setValue("#year", date[2]);
}

const resetForm = () => {
    setValue("#name", "");
    setDefaultText(".name-error");
    setDefaultText(".valid-name");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    setRange("#salary", ".salary-output", 400000);
    setSelectedIndex("#day", 0);
    setSelectedIndex("#month", 0);
    setSelectedIndex("#year", 0);
    setDefaultText(".startDate-error");
    setDefaultText(".valid-startDate");
    setValue("#notes", "");
};

const setValue = (propertyId, value) => {
    const element = document.querySelector(propertyId);
    element.value = value;
};

const setSelectedIndex = (propertyId, index) => {
    const element = document.querySelector(propertyId);
    element.selectedIndex = index;
};

const unsetSelectedValues = (propertyName) => {
    let allValues = document.querySelectorAll(propertyName);
    allValues.forEach(input => input.checked == false);
};

const setSelectedValues = (propertyName, values) => {
    let allValues = document.querySelectorAll(propertyName);
    allValues.forEach(input => {
        if (Array.isArray(values)) {
            if (values.includes(input.value)) {
                input.checked = true;
            }
        } else if (input.value == values) {
            input.checked = true;
        }
    });
};

const setRange = (propertyId, outputId, rangeValue) => {
    const rangeElement = document.querySelector(propertyId);
    rangeElement.value = rangeValue;
    const outputElement = document.querySelector(outputId);
    outputElement.textContent = rangeElement.value;
};

const setDefaultText = (propertyId) => {
    const contentElement = document.querySelector(propertyId);
    contentElement.textContent = "";
};

const checkForUpdate = () => {
    const employeeToEditJson = localStorage.getItem("EmployeeToEdit");
    isUpdate = employeeToEditJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObject = JSON.parse(employeeToEditJson);
    setForm();
};