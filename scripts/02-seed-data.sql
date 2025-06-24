-- Seed data for AISYWLC 2025

-- Insert admin user
INSERT INTO users (email, first_name, last_name, role, organization, designation) VALUES
('admin@aisywlc2025.org', 'Admin', 'User', 'admin', 'IEEE Gujarat Section', 'Administrator'),
('chirag.paunwala@nirmauni.ac.in', 'Chirag', 'Paunwala', 'admin', 'Nirma University', 'Professor'),
('prema.gaur@adaniuni.ac.in', 'Prema', 'Gaur', 'admin', 'Adani University', 'Professor');

-- Insert sample events
INSERT INTO events (title, description, event_type, speaker_name, speaker_bio, start_time, end_time, venue, max_capacity) VALUES
('Opening Keynote: Future of AI in Young Leadership', 'Explore how artificial intelligence is shaping the next generation of leaders', 'keynote', 'Dr. Rajesh Kumar', 'Leading AI researcher with 15+ years experience', '2025-03-15 09:00:00', '2025-03-15 10:30:00', 'Main Auditorium', 500),
('Workshop: Leadership Skills for Tech Professionals', 'Hands-on workshop on developing leadership skills in technology sector', 'workshop', 'Ms. Priya Sharma', 'Executive Coach and Leadership Consultant', '2025-03-15 11:00:00', '2025-03-15 12:30:00', 'Workshop Hall A', 100),
('Panel Discussion: Women in STEM Leadership', 'Panel discussion featuring successful women leaders in STEM fields', 'panel', 'Multiple Speakers', 'Industry leaders and academics', '2025-03-15 14:00:00', '2025-03-15 15:30:00', 'Conference Hall B', 200),
('Networking Session', 'Connect with fellow young leaders and industry professionals', 'networking', NULL, NULL, '2025-03-15 16:00:00', '2025-03-15 17:30:00', 'Networking Lounge', 300),
('Technical Workshop: Innovation in Engineering', 'Explore latest innovations and their impact on engineering practices', 'workshop', 'Prof. Amit Patel', 'Innovation expert and researcher', '2025-03-16 09:00:00', '2025-03-16 10:30:00', 'Tech Lab', 80),
('Closing Ceremony', 'Award ceremony and closing remarks', 'keynote', 'IEEE Gujarat Section Chair', 'IEEE Gujarat Section Leadership', '2025-03-16 16:00:00', '2025-03-16 17:00:00', 'Main Auditorium', 500);

-- Insert sample sponsors
INSERT INTO sponsors (name, tier, amount, contact_email, is_active) VALUES
('IEEE', 'platinum', 1000000.00, 'contact@ieee.org', true),
('Adani University', 'gold', 750000.00, 'partnerships@adaniuni.ac.in', true),
('Nirma University', 'gold', 750000.00, 'partnerships@nirmauni.ac.in', true),
('Tata Consultancy Services', 'silver', 500000.00, 'partnerships@tcs.com', true),
('Infosys Limited', 'silver', 500000.00, 'partnerships@infosys.com', true),
('Wipro Technologies', 'silver', 500000.00, 'partnerships@wipro.com', true),
('Reliance Industries', 'bronze', 250000.00, 'partnerships@ril.com', true),
('Microsoft India', 'bronze', 250000.00, 'partnerships@microsoft.com', true),
('Google India', 'bronze', 250000.00, 'partnerships@google.com', true),
('Amazon India', 'bronze', 250000.00, 'partnerships@amazon.in', true);

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type) VALUES
(1, 'Welcome to AISYWLC 2025', 'Thank you for joining the All India Student and Young Professional Leadership Congress 2025!', 'success'),
(1, 'Registration Confirmation', 'Your registration has been confirmed. Please check your email for details.', 'info'),
(1, 'Payment Reminder', 'Please complete your payment to secure your spot at the conference.', 'warning');
