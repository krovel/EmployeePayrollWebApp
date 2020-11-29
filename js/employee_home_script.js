window.addEventListener("DOMContentLoaded", () => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml =
        "<th></th>" +
        "<th>Name</th>" +
        "<th>Gender</th>" +
        "<th>Department</th>" +
        "<th>Salary</th>" +
        "<th>Start Date</th>" +
        "<th>Actions</th>";
    let employeePayrollLocalList = createEmployeePayrollJSON();
    let innerHtml = `${headerHtml}`;
    for (let employeePayrollData of employeePayrollLocalList) {
        innerHtml = `${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${employeePayrollData._profilePicture}"></td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${getDepartmentHtml(employeePayrollData._departments)}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${employeePayrollData._startDate}</td>
            <td>
                <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="..//assets/icons/delete-black-18dp.svg">
                <img name="${employeePayrollData._id}" onclick="update(this)" alt="edit" src="..//assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector("#display").innerHTML = innerHtml;
};

const createEmployeePayrollJSON = () => {
    let employeePayrollLocalList = [{
            _name: 'Kashif Ansari',
            _gender: 'Male',
            _departments: [
                'HR', 'Finance'
            ],
            _salary: '500000',
            _startDate: '01 Jan 2020',
            _note: 'First Dummy Employee',
            _id: new Date().getTime(),
            _profilePicture: '../assets/profile-images/Ellipse -3.png'
        },
        {
            _name: 'Laiba Rahil',
            _gender: 'Female',
            _departments: [
                'HR', 'Finance', 'Others'
            ],
            _salary: '700000',
            _startDate: '01 Aug 2016',
            _note: 'Second Dummy Employee',
            _id: new Date().getTime() + 1,
            _profilePicture: '../assets/profile-images/Ellipse -7.png'
        }
    ];
    return employeePayrollLocalList;
}

const getDepartmentHtml = (departmentList) => {
    let departmentHtml = "";
    for (let department of departmentList) {
        departmentHtml = `${departmentHtml} <div class="dept-label">${department}</div>`;
    }
    return departmentHtml;
};