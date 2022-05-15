-- CREATE Database
create database polyglots;

-- Create Table user_pronunciation
create table IF NOT EXISTS public.user_pronunciation (
    uid varchar(8) PRIMARY KEY,
    first_name text,
    last_name text,
    country text,
    audio_file_path text UNIQUE,
    last_modified_date TIMESTAMP,
    service_opt_out BOOLEAN,
    voice_name varchar(50),
    voice_gender text
);

-- insert into public.user_pronunciation (uid, first_name, last_name, audio_file_path, last_modified_date) values ('u816352', 'Shibankar', 'Ghosh', '/Users/shibankar/Documents/WF_Hackathon/audio_clips/u816352.wav', current_timestamp);

-- Create Table Voice_Name
create table IF NOT EXISTS public.voice_name (
    id SERIAL PRIMARY KEY,
    country text,
    locale varchar(8),
    gender text,
    voice_name varchar(50)
);

insert into public.voice_name (country, locale, gender, voice_name) values ('Australia', 'en-AU', 'Female', 'en-AU-NatashaNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('Australia', 'en-AU', 'Male', 'en-AU-WilliamNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Male', 'en-US-JacobNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Male', 'en-US-EricNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Male', 'en-US-ChristopherNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Male', 'en-US-BrandonNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Female', 'en-US-SaraNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Female', 'en-US-MonicaNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Female', 'en-US-MichelleNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Female', 'en-US-JennyNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Female', 'en-US-BrandonNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Female', 'en-US-ElizabethNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Female', 'en-US-CoraNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Female', 'en-US-AshleyNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United States', 'en-US', 'Female', 'en-US-AmberNeural');