-- Employee Table 
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    emp_code VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    hire_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll Records Table
CREATE TABLE IF NOT EXISTS payroll_records (
    id SERIAL PRIMARY KEY,
    emp_code VARCHAR(20) NOT NULL REFERENCES employees(emp_code) ON DELETE CASCADE,
    payroll_month DATE NOT NULL,
    base_salary DECIMAL(15, 2) NOT NULL,
    overtime_hours DECIMAL(6, 2) NOT NULL,
    overtime_amount DECIMAL(15, 2) NOT NULL,
    deductions DECIMAL(15, 2) NOT NULL,
    net_pay DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_payroll_record UNIQUE (emp_code, payroll_month)
);

-- Anomaly Type Table
CREATE TABLE IF NOT EXISTS anomaly_types (
    code VARCHAR(20) PRIMARY KEY,
    description TEXT NOT NULL
);

-- Anomalies Table
CREATE TABLE IF NOT EXISTS anomalies (
    id SERIAL PRIMARY KEY,
    emp_code VARCHAR(20) NOT NULL REFERENCES employees(emp_code) ON DELETE CASCADE,
    payroll_month DATE NOT NULL,
    anomaly_code VARCHAR(20) NOT NULL REFERENCES anomaly_types(code),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH')),
    explanation TEXT NOT NULL,
    previous_value DECIMAL(15, 2),
    current_value DECIMAL(15, 2),
    status VARCHAR(20) DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'REVIEWED', 'RESOLVED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_payroll_month ON payroll_records(payroll_month);
CREATE INDEX IF NOT EXISTS idx_anomaly_severity ON anomalies(severity);
CREATE INDEX IF NOT EXISTS idx_anomaly_employee ON anomalies(emp_code);