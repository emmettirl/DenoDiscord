INSERT INTO guilds (guildId, guildName, youtubeToken) VALUES ("guildId", "guildName", "youtubeToken");
INSERT INTO youtubeChannels (youtubeToken, youtubeChannelName, guildId) VALUES ("youtubeToken", "youtubeChannelName", "guildId");
INSERT INTO discordChannels (discordChannelId, discordChannelName, guildId, youTubePlaylistId, youtubeChannelId) VALUES ("discordChannelId", "discordChannelName", "guildId", "youTubePlaylistId", 0);
INSERT INTO videos (youtubeVideoId, guildId, playlistId) VALUES ("youtubeVideoId", "guildId", "playlistId");