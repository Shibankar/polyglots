-- CREATE Database
create database polyglots;

-- Create Table user_pronunciation
create table IF NOT EXISTS public.user_pronunciation (
    uid varchar(8) NOT NULL,
    first_name text,
    last_name text,
    audio_file_path text,
    last_modified_date TIMESTAMP,
    CONSTRAINT pk_user_pronunciation PRIMARY KEY (uid asc)
);

-- insert into public.user_pronunciation (uid, first_name, last_name, audio_file_path, last_modified_date) values ('u816352', 'Shibankar', 'Ghosh', '/Users/shibankar/Documents/WF_Hackathon/audio_clips/u816352.wav', current_timestamp);