const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
salary.oninput = function() {
    output.textContent = salary.value;
};