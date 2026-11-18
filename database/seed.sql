-- ============================================================================
-- SWAYAMURJA RENEWABLE ENERGY PVT. LTD.
-- PRODUCTION SEED DATA (ROLES, USERS, LEADS, CMS ASSETS, AUDIT LOGS)
-- ============================================================================

-- 1. SEED ROLES
INSERT INTO roles (id, role_code, role_name, description) VALUES
(1, 'SUPER_ADMIN', 'SK Softech Master Admin', 'Complete root master system privileges, user administration, database oversight'),
(2, 'ADMIN', 'SwayamUrja Operations Admin', 'Business operations, CRM lead funnel, CMS content publishing, solar tariffs'),
(3, 'VIEWER', 'Auditor & Field Executive', 'Read-only access to customer leads and technical solar feasibility reports')
ON CONFLICT (id) DO NOTHING;

-- 2. SEED PERMISSIONS
INSERT INTO permissions (permission_code, module, description) VALUES
('users:manage', 'SECURITY', 'Create, update, freeze or revoke admin accounts'),
('leads:view', 'CRM', 'Access and search prospective customer leads'),
('leads:edit', 'CRM', 'Update status, add notes and assign leads'),
('leads:delete', 'CRM', 'Permanently delete or purge leads'),
('leads:export', 'CRM', 'Export customer lead database to CSV / Excel'),
('cms:edit', 'CMS', 'Create and modify projects, blogs, testimonials and jobs'),
('tariffs:edit', 'CMS', 'Update solar subsidy rates and MSEDCL unit rates'),
('theme:edit', 'CMS', 'Change primary brand color palette and styling'),
('audit:view', 'SECURITY', 'Inspect immutable security audit logs and telemetry')
ON CONFLICT (permission_code) DO NOTHING;

-- Map Super Admin Permissions (ALL)
INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions
ON CONFLICT DO NOTHING;

-- Map Admin Permissions (Business operations, no user management or lead purge by default)
INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, id FROM permissions
WHERE permission_code IN ('leads:view', 'leads:edit', 'leads:export', 'cms:edit', 'tariffs:edit', 'theme:edit')
ON CONFLICT DO NOTHING;

-- 3. SEED USERS
-- Super Admin: sksoftech_master
-- Admin: swayamurja_admin
INSERT INTO users (id, role_id, username, email, password_hash, full_name, phone, is_active) VALUES
('a0000000-0000-0000-0000-000000000001', 1, 'sksoftech_master', 'superadmin@sksoftech.in', '$argon2id$v=19$m=65536,t=3,p=4$c2tzb2Z0ZWNoMjAyNg$eO7+mB/7Pj6Kj2XQ', 'SK Softech Root SuperAdmin', '+91 98000 00001', true),
('a0000000-0000-0000-0000-000000000002', 2, 'swayamurja_admin', 'admin@swayamurja.com', '$argon2id$v=19$m=65536,t=3,p=4$c3dheWFtdXJqYTIwMjY$nQ8+pL/8Qk7Lk3YR', 'SwayamUrja EPC Operations Head', '+91 92721 00623', true)
ON CONFLICT (username) DO NOTHING;

-- 4. SEED LEADS FROM CURRENT JSON STORE
INSERT INTO leads (id, full_name, phone, email, service_type, monthly_bill, city, notes, status) VALUES
('b0000000-0000-0000-0000-000000000001', 'Rajesh Deshmukh', '9822014589', 'rajesh.d@gmail.com', 'Residential Rooftop Solar', 4500.00, 'Pune (Kothrud)', 'Interested in PM Surya Ghar subsidy; 3 kW requested.', 'NEW'),
('b0000000-0000-0000-0000-000000000002', 'Amit Kulkarni', '9890123456', 'amit.k@autoancillary.com', 'Commercial & Industrial Solar', 125000.00, 'Chakan MIDC, Pune', 'Factory rooftop 800 sq.m; seeking 40% tax depreciation proposal.', 'SITE_SURVEY_SCHEDULED'),
('b0000000-0000-0000-0000-000000000003', 'Sanjay Patil', '9422334455', 'sanjay.patil@sugarfarm.in', 'Agri Solar Pump (PM-KUSUM)', 8500.00, 'Karad, Satara', 'Sugarcane irrigation; 7.5 HP solar pump subsidy enquiry.', 'CONTACTED'),
('b0000000-0000-0000-0000-000000000004', 'Dr. Sunita Ranade', '9822556677', 'sunitaranade@outlook.com', 'Housing Society Solar', 38000.00, 'Baner, Pune', 'Society chairman for 40 flats; common lift and water pump meter.', 'PROPOSAL_SENT'),
('b0000000-0000-0000-0000-000000000005', 'Nitin Shinde', '9970112233', 'nitin.shinde@solarpur.in', 'Utility Scale Solar', 450000.00, 'Solapur', 'Landowner with 25 acres near 33kV substation.', 'WON_CLOSED')
ON CONFLICT (id) DO NOTHING;

-- 5. SEED SOLAR TARIFFS
INSERT INTO solar_tariffs (id, residential_unit_rate, commercial_unit_rate, housing_society_rate, pm_surya_ghar_1kw, pm_surya_ghar_2kw, pm_surya_ghar_3kw_max) VALUES
(1, 8.50, 11.50, 9.20, 30000.00, 60000.00, 78000.00)
ON CONFLICT (id) DO NOTHING;

-- 6. SEED THEME SETTINGS
INSERT INTO theme_settings (id, theme_id, name, primary_color, secondary_color, accent_color, background_color, card_bg_color, text_color, font_family, is_active) VALUES
(1, 'solar-gold', 'Solar Engineering Gold (Active)', '#f59e0b', '#059669', '#10b981', '#f8faf9', '#ffffff', '#0f172a', 'Outfit, Inter, sans-serif', true)
ON CONFLICT (id) DO NOTHING;

-- 7. SEED INITIAL AUDIT LOGS
INSERT INTO audit_logs (id, user_id, role_id, username, action, target_table, target_id, old_values, new_values, ip_address) VALUES
('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 1, 'sksoftech_master', 'INSERT', 'roles', '1', NULL, '{"role_code": "SUPER_ADMIN", "role_name": "SK Softech Master Admin"}'::jsonb, '127.0.0.1'),
('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 1, 'sksoftech_master', 'INSERT', 'users', 'a0000000-0000-0000-0000-000000000002', NULL, '{"username": "swayamurja_admin", "role": "ADMIN"}'::jsonb, '127.0.0.1');
