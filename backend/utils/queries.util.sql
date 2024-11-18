CREATE OR REPLACE VIEW all_jobs AS
SELECT id, title, education, experience, company, addr, 
city, province, country, link, postDate, attendance, framework,
db, lang, lvl, software
FROM jobs j, attendance a, databases d, frameworks f, languages l,
levels lv, software s JOIN 