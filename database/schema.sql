-- ============================================================================
-- SWAYAMURJA RENEWABLE ENERGY PVT. LTD.
-- DEDICATED RELATIONAL POSTGRESQL ARCHITECTURE
-- Target: PostgreSQL 13+ / 16+ / 18+
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- MODULE 1: ROLES, PERMISSIONS & USERS (3-TIER RBAC)
-- ============================================================================

DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS solar_proposals CASCADE;
DROP TABLE IF EXISTS lead_notes CASCADE;
DROP TABLE IF EXISTS lead_status_history CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS theme_settings CASCADE;
DROP TABLE IF EXISTS solar_tariffs CASCADE;
DROP TABLE IF EXISTS job_postings CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS role_permissions CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- 1.1 Roles Table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_code VARCHAR(50) UNIQUE NOT NULL,       -- 'SUPER_ADMIN', 'ADMIN', 'VIEWER'
    role_name VARCHAR(100) NOT NULL,             -- 'SK Softech Master', 'SwayamUrja Operations'
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 1.2 Granular Permissions Table
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    permission_code VARCHAR(100) UNIQUE NOT NULL,-- e.g. 'leads:delete', 'tariffs:edit'
    module VARCHAR(50) NOT NULL,                 -- 'CRM', 'CMS', 'SYSTEM', 'SECURITY'
    description TEXT
);

-- 1.3 Role-Permissions Mapping
CREATE TABLE role_permissions (
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 1.4 Users Table (Super Admin, Admins)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id INT REFERENCES roles(id) ON DELETE RESTRICT NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    last_login_at TIMESTAMPTZ,
    last_login_ip VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role_id ON users(role_id);

-- ============================================================================
-- MODULE 2: CRM & SOLAR LEADS MANAGEMENT
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE lead_status_enum AS ENUM (
        'NEW', 'CONTACTED', 'SITE_SURVEY_SCHEDULED', 'PROPOSAL_SENT', 'WON_CLOSED', 'LOST'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    service_type VARCHAR(100) NOT NULL,          -- 'Residential Rooftop', 'Commercial C&I', 'Agri Pump'
    monthly_bill DECIMAL(12, 2) NOT NULL,
    city VARCHAR(100) NOT NULL,
    roof_area_sqft DECIMAL(10, 2),
    notes TEXT,
    status lead_status_enum DEFAULT 'NEW' NOT NULL,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

CREATE TABLE lead_status_history (
    id SERIAL PRIMARY KEY,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
    old_status lead_status_enum,
    new_status lead_status_enum NOT NULL,
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    comment TEXT,
    changed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE lead_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL NOT NULL,
    note_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- MODULE 3: CMS WEBSITE CONTENT & LIVE ASSETS
-- ============================================================================

CREATE TABLE projects (
    id VARCHAR(50) PRIMARY KEY,                  -- 'proj-1', 'proj-13mw-solapur'
    category VARCHAR(50) NOT NULL,               -- 'utility', 'commercial', 'residential', 'agri'
    title_en VARCHAR(255) NOT NULL,
    title_mr VARCHAR(255) NOT NULL,
    capacity VARCHAR(100) NOT NULL,              -- '13 MW', '1,250 kW'
    location_en VARCHAR(150) NOT NULL,
    location_mr VARCHAR(150) NOT NULL,
    highlight_en TEXT,
    highlight_mr TEXT,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE testimonials (
    id VARCHAR(50) PRIMARY KEY,
    client_name VARCHAR(150) NOT NULL,
    role_org VARCHAR(200),
    city VARCHAR(100),
    rating INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    system_size VARCHAR(100),
    savings_text VARCHAR(150),
    comment_en TEXT NOT NULL,
    comment_mr TEXT NOT NULL,
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE articles (
    id VARCHAR(50) PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_mr VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    read_time VARCHAR(50) DEFAULT '4 min read',
    publish_date VARCHAR(50),
    image_url TEXT NOT NULL,
    excerpt_en TEXT,
    excerpt_mr TEXT,
    content_en TEXT NOT NULL,
    content_mr TEXT NOT NULL,
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE job_postings (
    id VARCHAR(50) PRIMARY KEY,
    title_en VARCHAR(200) NOT NULL,
    title_mr VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    experience_en VARCHAR(100),
    experience_mr VARCHAR(100),
    location_en VARCHAR(100),
    location_mr VARCHAR(100),
    skills TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE solar_tariffs (
    id SERIAL PRIMARY KEY,
    residential_unit_rate DECIMAL(6, 2) DEFAULT 8.50 NOT NULL,
    commercial_unit_rate DECIMAL(6, 2) DEFAULT 11.50 NOT NULL,
    housing_society_rate DECIMAL(6, 2) DEFAULT 9.20 NOT NULL,
    pm_surya_ghar_1kw DECIMAL(10, 2) DEFAULT 30000.00 NOT NULL,
    pm_surya_ghar_2kw DECIMAL(10, 2) DEFAULT 60000.00 NOT NULL,
    pm_surya_ghar_3kw_max DECIMAL(10, 2) DEFAULT 78000.00 NOT NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE theme_settings (
    id SERIAL PRIMARY KEY,
    theme_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    primary_color VARCHAR(20) NOT NULL,
    secondary_color VARCHAR(20) NOT NULL,
    accent_color VARCHAR(20) NOT NULL,
    background_color VARCHAR(20) NOT NULL,
    card_bg_color VARCHAR(20) NOT NULL,
    text_color VARCHAR(20) NOT NULL,
    font_family VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- MODULE 4: SOLAR ENGINEERING FEASIBILITY PROPOSALS
-- ============================================================================

CREATE TABLE solar_proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    customer_name VARCHAR(150),
    customer_phone VARCHAR(20),
    monthly_bill DECIMAL(12, 2) NOT NULL,
    recommended_kw DECIMAL(8, 2) NOT NULL,
    estimated_gross_cost DECIMAL(12, 2) NOT NULL,
    dbt_subsidy_amount DECIMAL(12, 2) NOT NULL,
    net_customer_investment DECIMAL(12, 2) NOT NULL,
    annual_generation_units DECIMAL(12, 2) NOT NULL,
    annual_financial_savings DECIMAL(12, 2) NOT NULL,
    payback_period_years DECIMAL(4, 1) NOT NULL,
    pdf_filename VARCHAR(255),
    generated_ip VARCHAR(45),
    generated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_proposals_phone ON solar_proposals(customer_phone);

-- ============================================================================
-- MODULE 5: COMPREHENSIVE SECURITY AUDIT LOGS
-- ============================================================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    role_id INT REFERENCES roles(id) ON DELETE SET NULL,
    username VARCHAR(100),
    action VARCHAR(50) NOT NULL,                 -- 'LOGIN', 'LOGOUT', 'INSERT', 'UPDATE', 'DELETE', 'EXPORT'
    target_table VARCHAR(50) NOT NULL,           -- 'leads', 'solar_tariffs', 'users', 'projects'
    target_id VARCHAR(100),                      -- PK of affected record
    old_values JSONB,                            -- Snapshot before change
    new_values JSONB,                            -- Snapshot after change
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_table ON audit_logs(target_table);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at DESC);
