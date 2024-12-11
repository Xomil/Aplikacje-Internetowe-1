create table club
(
    id      integer not null
        constraint club_pk
            primary key autoincrement,
    subject text not null,
    content text not null
)