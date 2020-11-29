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

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }

    get profilePicture() {
        return this._profilePicture;
    }
    set profilePicture(profilePicture) {
        this._profilePicture = profilePicture;
    }

    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
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

    get note() {
        return this._note;
    }
    set note(note) {
        thiss._note = note;
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = !this.startDate ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "[ id: " + this.id + ", name: " + this.name + ", gender: " + this.gender + ",profilePicture: " + this._profilePicture +
            ", salary: " + this.salary + ", startDate: " + employeeDate + ", departments: " + this.departments + ", note: " + this._note + " ]" + "\n";
    }
}