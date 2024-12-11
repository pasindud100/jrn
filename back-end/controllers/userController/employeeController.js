import Employee from "../../models/newModels/employeeModel.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({ message: "Employee added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding employee" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (err) {
    res.status(404).json({ message: "Employee not found" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(employee);
  } catch (err) {
    res.status(404).json({ message: "Employee not found" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ message: "Employee deleted successfully" });
  } catch (err) {
      res.status(404).json({ message: "Employee not found" });
  }
};

