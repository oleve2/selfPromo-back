123

create table TEST_tab1 (
	id serial,
	topic varchar,
	contents varchar
)


select * from TEST_tab1
order by id

insert into TEST_tab1 (topic, contents) values 
('top1', ' some content 1'), ('top1', ' some content 2'),
('top2', ' some content blabla'), ('top2', ' adjnkajsndkjnas;dn;a'), ('top2', 'привет друг')

--update TEST_tab1 
set contents = contents || ' AAA' 
--select * from TEST_tab1
where id=1















