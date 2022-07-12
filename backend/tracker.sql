\echo 'Delete and Recreate users Table?'

\prompt 'Return for yes and CMD+C cancel > ' answer


DROP DATABASE tracker_data;


CREATE DATABASE tracker_data;

\connect tracker_data;

\i tracker-schema.sql;