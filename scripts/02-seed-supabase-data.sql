-- Seed data for AISYWLC 2025 with Supabase

-- Note: Admin users will be created through Supabase Auth
-- This script assumes admin users are already created

-- Insert sample events
INSERT INTO public.events (title, description, event_type, speaker_name, speaker_bio, start_time, end_time, venue, max_capacity) VALUES
('Opening Keynote: Future of AI in Young Leadership', 'Explore how artificial intelligence is shaping the next generation of leaders', 'keynote', 'Dr. Rajesh Kumar', 'Leading AI researcher with 15+ years experience', '2025-03-15 09:00:00+05:30', '2025-03-15 10:30:00+05:30', 'Main Auditorium', 500),
('Workshop: Leadership Skills for Tech Professionals', 'Hands-on workshop on developing leadership skills in technology sector', 'workshop', 'Ms. Priya Sharma', 'Executive Coach and Leadership Consultant', '2025-03-15 11:00:00+05:30', '2025-03-15 12:30:00+05:30', 'Workshop Hall A', 100),
('Panel Discussion: Women in STEM Leadership', 'Panel discussion featuring successful women leaders in STEM fields', 'panel', 'Multiple Speakers', 'Industry leaders and academics', '2025-03-15 14:00:00+05:30', '2025-03-15 15:30:00+05:30', 'Conference Hall B', 200),
('Networking Session', 'Connect with fellow young leaders and industry professionals', 'networking', NULL, NULL, '2025-03-15 16:00:00+05:30', '2025-03-15 17:30:00+05:30', 'Networking Lounge', 300),
('Technical Workshop: Innovation in Engineering', 'Explore latest innovations and their impact on engineering practices', 'workshop', 'Prof. Amit Patel', 'Innovation expert and researcher', '2025-03-16 09:00:00+05:30', '2025-03-16 10:30:00+05:30', 'Tech Lab', 80),
('Cultural Program', 'Experience the rich cultural heritage of Gujarat', 'cultural', 'Cultural Committee', 'Local artists and performers', '2025-03-16 18:00:00+05:30', '2025-03-16 20:00:00+05:30', 'Cultural Hall', 400),
('Closing Ceremony', 'Award ceremony and closing remarks', 'keynote', 'IEEE Gujarat Section Chair', 'IEEE Gujarat Section Leadership', '2025-03-16 16:00:00+05:30', '2025-03-16 17:00:00+05:30', 'Main Auditorium', 500);

-- Insert sample sponsors
INSERT INTO public.sponsors (name, tier, amount, contact_email, is_active, logo_url) VALUES
('IEEE', 'platinum', 1000000.00, 'contact@ieee.org', true, '/images/sponsors/ieee-logo.png'),
('Adani University', 'gold', 750000.00, 'partnerships@adaniuni.ac.in', true, '/images/sponsors/adani-logo.png'),
('Nirma University', 'gold', 750000.00, 'partnerships@nirmauni.ac.in', true, '/images/sponsors/nirma-logo.png'),
('Tata Consultancy Services', 'silver', 500000.00, 'partnerships@tcs.com', true, '/images/sponsors/tcs-logo.png'),
('Infosys Limited', 'silver', 500000.00, 'partnerships@infosys.com', true, '/images/sponsors/infosys-logo.png'),
('Wipro Technologies', 'silver', 500000.00, 'partnerships@wipro.com', true, '/images/sponsors/wipro-logo.png'),
('Reliance Industries', 'bronze', 250000.00, 'partnerships@ril.com', true, '/images/sponsors/reliance-logo.png'),
('Microsoft India', 'bronze', 250000.00, 'partnerships@microsoft.com', true, '/images/sponsors/microsoft-logo.png'),
('Google India', 'bronze', 250000.00, 'partnerships@google.com', true, '/images/sponsors/google-logo.png'),
('Amazon India', 'bronze', 250000.00, 'partnerships@amazon.in', true, '/images/sponsors/amazon-logo.png');

-- Create a function to get registration pricing
CREATE OR REPLACE FUNCTION public.get_registration_price(reg_type registration_type)
RETURNS DECIMAL AS $$
BEGIN
    CASE reg_type
        WHEN 'student' THEN RETURN 2500.00;
        WHEN 'ieee_member' THEN RETURN 2000.00;
        WHEN 'professional' THEN RETURN 5000.00;
        ELSE RETURN 5000.00;
    END CASE;
END;
$$ LANGUAGE plpgsql;

-- Create a function to send welcome notification
CREATE OR REPLACE FUNCTION public.send_welcome_notification(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.notifications (user_id, title, message, type)
    VALUES (
        user_uuid,
        'Welcome to AISYWLC 2025!',
        'Thank you for joining the All India Student and Young Professional Leadership Congress 2025! Please complete your registration and payment to secure your spot.',
        'success'
    );
END;
$$ LANGUAGE plpgsql;
