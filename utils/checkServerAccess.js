const access = require('../data/server-access.json');

module.exports = {
  isWhitelisted(guildId) {
    if (access.whitelist.length > 0) {
      return access.whitelist.includes(guildId);
    }
    return true;
  },

  isBlacklisted(guildId) {
    return access.blacklist.includes(guildId);
  }
};
