//for mongo db
const mongoose = require('mongoose')

//add this line mongo for server
mongoose.connect('mongodb://localhost/mongo&express')

//creating schema
var employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    type: String,
    hourRate: Number,
    totalHour: Number
})
//u can define method in schema
employeeSchema.methods.totalSalaryMethod = function () {
    console.log(" U can also define methods in schema As, employee name is %s & Total Salary Would be = %d ", this.name, this.hourRate * this.totalHour)
}
//creating model
var employeeModel = mongoose.model('EmployeeTable', employeeSchema)
//creating obj
var employees = new employeeModel({
    name: 'Saba',
    email: 'sn.sabanoor97@gmail.com',
    type: 'Software Engineer',
    hourRate: 10,
    totalHour: 16,
})
//calling method
employees.totalSalaryMethod()

//printing on console
console.log("Employee Data: " + employees + " Total income of employee: " + employees.hourRate * employees.totalHour)


