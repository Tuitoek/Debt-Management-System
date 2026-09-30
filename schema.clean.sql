CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone_number VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE budgets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  monthly_limit NUMERIC(12,2) NOT NULL,
  rule_name VARCHAR(50)
);

CREATE TABLE subcategories (
  id SERIAL PRIMARY KEY,
  budget_id INTEGER REFERENCES budgets(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE debts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  total_amount NUMERIC(12,2) NOT NULL,
  installment_amount NUMERIC(12,2),
  interest_rate NUMERIC(5,2) DEFAULT 0,
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  subcategory_id INTEGER REFERENCES subcategories(id) ON DELETE CASCADE,
  description VARCHAR(150),
  amount NUMERIC(12,2) NOT NULL,
  expense_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE income (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  source VARCHAR(100),
  amount NUMERIC(12,2) NOT NULL,
  date_received DATE DEFAULT CURRENT_DATE
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  debt_id INTEGER REFERENCES debts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  amount_paid NUMERIC(12,2) NOT NULL,
  payment_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE savings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  goal_name VARCHAR(100),
  target_amount NUMERIC(12,2),
  saved_amount NUMERIC(12,2) DEFAULT 0,
  target_date DATE
);