

-- seed community status --
INSERT INTO community.statuses(name, description) 
VALUES ('draft', 'items under this bucket are in draft state'),
('archived', 'items under this bucket are archived'),
('completed', 'items under this bucket are marked complete'),
('pending', 'items under this bucket are in pending state'),
('urgent', 'items under this bucket require immediate attention'),
('general', 'items under this bucket are generalized items'),
('on_hold', 'items under this bucket are on hold and needs more information'),
('cancelled', 'items under this bucket are cancelled and pending for deletion');
