const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV01zcmxuZ0ZKUmIrdVBoZ1BRWnEyU3BuOE8wZXNud1pSdHdEempJSXFucz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ1VWeEdEa2Z1VjlVQ1o2SHJQb0djZUtMRmpnM0ZpNTBIR0tIOVQ3aVhSMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1R1dxQUQ1QWtaZjZDeURpZjY1Y1Y0aTNCQUxabldZNHJrYlFsc0RvRFhNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTU9YYXJaTEhBeU90OXRLN0hhWXo1K01zUnlFWHhsMDBTYm5BTU9ZK1M4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFGWFJVcDBETDg1YWJHS0hsSk4yZnVzR1QxVkw2RC9DTkRmWjNrWHVGbTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhXbWoxcXlCNkwwcDBMRlQrelFOQnVtRERWcCtVaW85THVvOEJIeC85aG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUZpb0h5QUNwcURrcmxxb0R4dUpuenBPd2RMcnpRM000eXJmWGNvTzlFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieittV3JDdjNMYmdVeW54T0FCakJpUFlVb0lmcHR5M25qUEdqZUt5a0lXOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkU2c0Q1eVcvRG5vcm1JOXNZcEhWbUprb1JFTTNCUHlLS1F3eXpoR0xZT0tyU01QY1JXT0pmOTZGMjFzQnM3TDRkRVZ3UHJzNTNKNW5xQzNRa0NOUmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYyLCJhZHZTZWNyZXRLZXkiOiJKVVJPQlhxUmEwZW1Gb0Q4YlFXMHJiYkRNeDU5RHZVQUtKYXpvOExiRG5rPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI0OTk2NDkyMjQzMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBMTYzQTRFQUY2REY4QzZFQkFCNkFBRkE2Q0RDOTM1NiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzEzMTAzNzY3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNDk5NjQ5MjI0MzBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQ0M1QTU1NTExN0Q2NzkwMjE0NEFCNDMyNEQyOUU3QkQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxMzEwMzc2N30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjQ5OTY0OTIyNDMwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjU1RTgzNzEwMzNDNDc1NzAxNEY0NTk2M0U2MTg0Q0M5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTMxMDM3Njh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI0OTk2NDkyMjQzMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGM0U1NUVGQjEzNjc4OTI1QjdCMkY0NEFBRkE5NUU5OCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzEzMTAzNzY4fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJoOU5uLXNfM1NkLVZFc25IVnpaMExRIiwicGhvbmVJZCI6ImM1MzA1MzUwLTZlZTItNDA5NS04YmQ5LTRmNWU5OWI5NjliNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzcS9NM3BJZGM5dDFTQ1psRnA3YktiMzlPSFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieGwvWC9CZ3RsZlFFLzVnaS9SZkNqUmlLRXIwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlY0QVBKUDZEIiwibWUiOnsiaWQiOiIyNDk5NjQ5MjI0MzA6MzBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTWFsYWsifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BMTHR2d0dFSW5INzdBR0dBRT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZi82UHJGUTFGeFVtTjc0NW5rQTdnMVl2RTBCdHhVOG53bk15R2IyWEFuTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibzZwZUlWVE9ZWWIrd0NvQ0thNUEvUkxqa3MyUHZPY1o2bE9vWUhlam9CWlBFL3R6dTJjMzR0d2tGZWROWVZRSEw5cCtEOG1yRFAwbzJicm0vbFRCQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6Ik04UEFoc0FKR0pDTUFvcHdOMTFQQXZJemIwZ3NQZTZQOS9Gd0E3eUlPaWc3U0ljK1BQeStzS2xQVmd3bkdoWWxFZEhMc3BQYnhzUFd1ZVdGT2hmOWh3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjQ5OTY0OTIyNDMwOjMwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlgvK2o2eFVOUmNWSmplK09aNUFPNE5XTHhOQWJjVlBKOEp6TWhtOWx3SnoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTMxMDM3NjYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTkEzIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
