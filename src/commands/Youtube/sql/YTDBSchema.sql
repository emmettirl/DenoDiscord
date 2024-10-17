CREATE TABLE IF NOT EXISTS guilds
(
    guildId      TEXT PRIMARY KEY,
    guildName    TEXT,
    youtubeToken TEXT
);

CREATE TABLE IF NOT EXISTS youtubeChannels
(
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    youtubeToken       TEXT,
    youtubeChannelName TEXT,
    guildId            TEXT,
    FOREIGN KEY (guildId) REFERENCES guilds (guildId)
);

CREATE TABLE IF NOT EXISTS discordChannels
(
    discordChannelId   TEXT PRIMARY KEY,
    discordChannelName TEXT,
    guildId            TEXT,
    youtubePlaylistId  TEXT,
    youtubeChannelId   INTEGER,
    FOREIGN KEY (guildId) REFERENCES guilds (guildId),
    FOREIGN KEY (youtubeChannelId) REFERENCES youtubeChannels (id)
);

CREATE TABLE IF NOT EXISTS videos
(
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    youtubeVideoId TEXT,
    guildId        TEXT,
    playlistId     TEXT,
    FOREIGN KEY (playlistId) REFERENCES discordChannels (youTubePlaylistId),
    FOREIGN KEY (guildId) REFERENCES guilds (guildId)
);