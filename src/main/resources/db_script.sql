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
--------
insert into public.voice_name (country, locale, gender, voice_name) values ('Canada', 'en-CA', 'Female', 'en-CA-ClaraNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('Canada', 'en-CA', 'Male', 'en-CA-LiamNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('Hongkong', 'en-HK', 'Female', 'en-HK-YanNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('Hongkong', 'en-HK', 'Male', 'en-HK-SamNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('India', 'en-IN', 'Female', 'en-IN-NeerjaNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('India', 'en-IN', 'Male', 'en-IN-PrabhatNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('Ireland', 'en-IE', 'Female', 'en-IE-EmilyNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('Ireland', 'en-IE', 'Male', 'en-IE-ConnorNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('Kenya', 'en-KE', 'Female', 'en-KE-AsiliaNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('Kenya', 'en-KE', 'Male', 'en-KE-ChilembaNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('New Zealand', 'en-NZ', 'Female', 'en-NZ-MollyNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('New Zealand', 'en-NZ', 'Male', 'en-NZ-MitchellNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('Nigeria', 'en-NG', 'Female', 'en-NG-EzinneNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('Nigeria', 'en-NG', 'Male', 'en-NG-AbeoNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('Philippines', 'en-PH', 'Female', 'en-PH-RosaNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('Philippines', 'en-PH', 'Male', 'en-PH-JamesNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('Singapore', 'en-SG', 'Female', 'en-SG-LunaNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('Singapore', 'en-SG', 'Male', 'en-SG-WayneNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('South Africa', 'en-ZA', 'Female', 'en-ZA-LeahNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('South Africa', 'en-ZA', 'Male', 'en-ZA-LukeNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('Tanzania', 'en-TZ', 'Female', 'en-TZ-ImaniNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('Tanzania', 'en-TZ', 'Male', 'en-TZ-ElimuNeural');

insert into public.voice_name (country, locale, gender, voice_name) values ('United Kingdom', 'en-GB', 'Female', 'en-GB-LibbyNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United Kingdom', 'en-GB', 'Female', 'en-GB-SoniaNeural');
insert into public.voice_name (country, locale, gender, voice_name) values ('United Kingdom', 'en-GB', 'Male', 'en-GB-RyanNeural');