INSERT INTO employees (emp_code, first_name, last_name, department, position, hire_date)
VALUES
('EMP001', 'Rahul', 'Sharma', 'Engineering', 'Frontend Developer', '2023-01-15'),
('EMP002', 'Ananya', 'Verma', 'Engineering', 'Backend Developer', '2022-08-01'),
('EMP003', 'Vikram', 'Singh', 'HR', 'HR Manager', '2021-05-10');

INSERT INTO payroll_records (emp_code, payroll_month, base_salary, overtime_hours, overtime_amount, deductions, net_pay)
VALUES
('EMP001', '2023-02-01', 60000.00, 10.0, 5000.00, 2000.00, 63000.00),
('EMP002', '2023-02-01', 65000.00, 5.0, 2500.00, 1500.00, 66000.00),
('EMP003', '2023-02-01', 70000.00, 0.0, 0.00, 3000.00, 67000.00);

INSERT INTO payroll_records (emp_code, payroll_month, base_salary, overtime_hours, overtime_amount, deductions, net_pay)
VALUES
('EMP001', '2023-03-01', 62000.00, 12.0, 6000.00, 2200.00, 65800.00),
('EMP002', '2023-03-01', 65000.00, 4.0, 2000.00, 1500.00, 65500.00),
('EMP003', '2023-03-01', 70000.00, 0.0, 0.00, 3000.00, 67000.00);

INSERT INTO anomaly_types (code, description)
VALUES
('SALARY_SPIKE', 'Salary increased beyond allowed threshold'),
('OVERTIME_ABUSE', 'Unusually high overtime detected'),
('MISSING_DEDUCTION', 'Expected deduction missing'),
('DUPLICATE_PAYMENT', 'Duplicate payroll detected');