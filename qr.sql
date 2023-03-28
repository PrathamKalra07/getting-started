SELECT s.*,c.x,c.y,c.height,c.width,c.pageId as pageNo, c.field_id as fieldId,f.type as fieldType,c.eleId FROM coordinates as c  
LEFT JOIN signatory as s ON s.id = c.signatory_id 
LEFT JOIN field as f ON f.id = c.field_id 
JOIN template_instance as ti ON ti.id = c.template_instance_id 
WHERE ti.uuid_template_instance = '97048b99-8452-40c9-9c3c-69652ccb4391';

SELECT * FROM coordinates as c LEFT JOIN template_instance as ti ON ti.id = c.template_instance_id WHERE ti.uuid_template_instance = '97048b99-8452-40c9-9c3c-69652ccb4391'



SELECT * FROM coordinates as c 
LEFT JOIN signatory as s ON s.id = c.signatory_id
LEFT JOIN template_instance as ti ON ti.id = c.template_instance_id 
WHERE ti.uuid_template_instance = '97048b99-8452-40c9-9c3c-69652ccb4391';


SELECT * FROM coordinates as c 
LEFT JOIN signatory as s ON s.id = c.signatory_id
LEFT JOIN template_instance as ti ON ti.id = c.template_instance_id 
WHERE ti.uuid_template_instance = '97048b99-8452-40c9-9c3c-69652ccb4391'
AND s.uuid_signatory = '';



SELECT * FROM coordinates as c 
JOIN signatory as s ON s.id = c.signatory_id
JOIN template_instance as ti ON ti.id = c.template_instance_id
WHERE ti.uuid_template_instance = 'b7a6f721-3605-4b81-b186-5de5ebe867f3' 
OR s.template_instance_id = ti.id ;