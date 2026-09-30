--
-- PostgreSQL database dump
--

\restrict 2Ih6PeSaBbU8ffx69eHVuzDoTLuqhYH5cHzO74lEy0TF0TBBLYd3ua7y1RhyKwf

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: subcategories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subcategories (
    id integer CONSTRAINT budget_subcategories_id_not_null NOT NULL,
    budget_id integer,
    user_id integer,
    name character varying(100) CONSTRAINT budget_subcategories_name_not_null NOT NULL,
    amount numeric(12,2) CONSTRAINT budget_subcategories_amount_not_null NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: budget_subcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.budget_subcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: budget_subcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.budget_subcategories_id_seq OWNED BY public.subcategories.id;


--
-- Name: budgets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.budgets (
    id integer NOT NULL,
    user_id integer,
    category character varying(100) NOT NULL,
    monthly_limit numeric(12,2) NOT NULL,
    rule_name character varying(50)
);


--
-- Name: budgets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.budgets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: budgets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.budgets_id_seq OWNED BY public.budgets.id;


--
-- Name: debts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.debts (
    id integer NOT NULL,
    user_id integer,
    name character varying(100) NOT NULL,
    total_amount numeric(12,2) NOT NULL,
    installment_amount numeric(12,2),
    interest_rate numeric(5,2) DEFAULT 0,
    due_date date,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: debts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.debts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: debts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.debts_id_seq OWNED BY public.debts.id;


--
-- Name: expenses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expenses (
    id integer NOT NULL,
    subcategory_id integer,
    description character varying(150),
    amount numeric(12,2) NOT NULL,
    expense_date date DEFAULT CURRENT_DATE,
    created_at timestamp without time zone DEFAULT now(),
    user_id integer
);


--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.expenses_id_seq OWNED BY public.expenses.id;


--
-- Name: income; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.income (
    id integer NOT NULL,
    user_id integer,
    source character varying(100),
    amount numeric(12,2) NOT NULL,
    date_received date DEFAULT CURRENT_DATE
);


--
-- Name: income_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.income_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: income_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.income_id_seq OWNED BY public.income.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    debt_id integer,
    user_id integer,
    amount_paid numeric(12,2) NOT NULL,
    payment_date date DEFAULT CURRENT_DATE
);


--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: savings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.savings (
    id integer NOT NULL,
    user_id integer,
    goal_name character varying(100),
    target_amount numeric(12,2),
    saved_amount numeric(12,2) DEFAULT 0,
    target_date date
);


--
-- Name: savings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.savings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: savings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.savings_id_seq OWNED BY public.savings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    phone_number character varying(20),
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: budgets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.budgets ALTER COLUMN id SET DEFAULT nextval('public.budgets_id_seq'::regclass);


--
-- Name: debts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.debts ALTER COLUMN id SET DEFAULT nextval('public.debts_id_seq'::regclass);


--
-- Name: expenses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenses ALTER COLUMN id SET DEFAULT nextval('public.expenses_id_seq'::regclass);


--
-- Name: income id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.income ALTER COLUMN id SET DEFAULT nextval('public.income_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: savings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.savings ALTER COLUMN id SET DEFAULT nextval('public.savings_id_seq'::regclass);


--
-- Name: subcategories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subcategories ALTER COLUMN id SET DEFAULT nextval('public.budget_subcategories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: budgets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.budgets (id, user_id, category, monthly_limit, rule_name) FROM stdin;
1	1	Transport 	6000.00	\N
5	1	Savings	11000.00	\N
6	1	Needs	27500.00	\N
\.


--
-- Data for Name: debts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.debts (id, user_id, name, total_amount, installment_amount, interest_rate, due_date, created_at) FROM stdin;
4	1	Bank 	2000.00	2000.00	0.00	2026-09-08	2026-09-23 11:47:22.966267
\.


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.expenses (id, subcategory_id, description, amount, expense_date, created_at, user_id) FROM stdin;
4	4	Tithe	5000.00	2026-09-11	2026-09-11 13:38:00.602022	1
7	14	Buying Sufuria	3400.00	2026-09-11	2026-09-11 15:27:22.520238	1
\.


--
-- Data for Name: income; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.income (id, user_id, source, amount, date_received) FROM stdin;
1	1	Freelance	15000.00	2026-08-20
2	1	Salary	40000.00	2026-08-25
3	1	Freelance	3000.00	2026-09-23
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payments (id, debt_id, user_id, amount_paid, payment_date) FROM stdin;
\.


--
-- Data for Name: savings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.savings (id, user_id, goal_name, target_amount, saved_amount, target_date) FROM stdin;
1	1	Moving Out Fund	100000.00	15000.00	2026-10-31
\.


--
-- Data for Name: subcategories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.subcategories (id, budget_id, user_id, name, amount, created_at) FROM stdin;
3	5	1	Emergency Fund	2000.00	2026-09-01 15:21:42.354981
4	5	1	Tithe	5500.00	2026-09-01 15:22:18.078028
5	5	1	Moving Out Goal	3400.00	2026-09-01 15:22:20.36779
14	6	1	Buy Sufuria	2000.00	2026-09-11 15:27:05.541014
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, phone_number, password, created_at) FROM stdin;
1	Sarah	sarah@gmail.com	0715455287	$2b$10$C9HOVFRfPwCP57vJz0yLRu0kcyK2A5EHHwNKc4NhCAiLgQXMb6MZa	2026-08-19 14:39:15.095901
2	brian	brian@gmail.com	0725128579	$2b$10$8W9XX9gNPJCOwK.UE7V0E.Jc5FoKRke/xmnjqNwwUwbLH7y5K32jm	2026-09-28 11:26:20.783459
\.


--
-- Name: budget_subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.budget_subcategories_id_seq', 14, true);


--
-- Name: budgets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.budgets_id_seq', 11, true);


--
-- Name: debts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.debts_id_seq', 4, true);


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.expenses_id_seq', 7, true);


--
-- Name: income_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.income_id_seq', 3, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: savings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.savings_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: subcategories budget_subcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT budget_subcategories_pkey PRIMARY KEY (id);


--
-- Name: budgets budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (id);


--
-- Name: debts debts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.debts
    ADD CONSTRAINT debts_pkey PRIMARY KEY (id);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- Name: income income_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT income_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: savings savings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.savings
    ADD CONSTRAINT savings_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: subcategories budget_subcategories_budget_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT budget_subcategories_budget_id_fkey FOREIGN KEY (budget_id) REFERENCES public.budgets(id) ON DELETE CASCADE;


--
-- Name: subcategories budget_subcategories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT budget_subcategories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: budgets budgets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: debts debts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.debts
    ADD CONSTRAINT debts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: expenses expenses_subcategory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_subcategory_id_fkey FOREIGN KEY (subcategory_id) REFERENCES public.subcategories(id) ON DELETE CASCADE;


--
-- Name: expenses expenses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: income income_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT income_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payments payments_debt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_debt_id_fkey FOREIGN KEY (debt_id) REFERENCES public.debts(id) ON DELETE CASCADE;


--
-- Name: payments payments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: savings savings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.savings
    ADD CONSTRAINT savings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 2Ih6PeSaBbU8ffx69eHVuzDoTLuqhYH5cHzO74lEy0TF0TBBLYd3ua7y1RhyKwf

