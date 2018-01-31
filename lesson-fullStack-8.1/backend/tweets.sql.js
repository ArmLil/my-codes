'use strict'

const Utils = require('./utils')
const TABLE_NAME = 'tweetsTable'

const DEFAULT_COLUMNS = ['created_at DATETIME DEFAULT CURRENT_TIMESTAMP', 'updated_at DATETIME DEFAULT CURRENT_TIMESTAMP', 'deleted_at DATETIME']
const COLUMNS_CREATE = ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'user TEXT', 'tweet TEXT', 'colour TEXT']
const COLUMNS = ['user', 'tweet', 'colour']

module.exports = {
  tableName: TABLE_NAME,
  columns: COLUMNS,
  createTable: `
  CREATE TABLE if not exists ${TABLE_NAME}
  (${(COLUMNS_CREATE.concat(DEFAULT_COLUMNS)).join(', ')})`,

  selectTweets: ( offset, limit) => {
    return `
     SELECT *
     FROM ${TABLE_NAME}
     WHERE deleted_at IS NULL
     ORDER BY id
     LIMIT ${limit} OFFSET ${offset}`
  },

  selectTweetById: (id) => {
    return `
    SELECT * from ${TABLE_NAME}
    WHERE id=${id}`
  },

  insert: (tweet) => {
    let values = `('${tweet.user}', '${tweet.tweet}', '${tweet.colour}')`
    return `
    INSERT INTO ${TABLE_NAME}
    (${COLUMNS.join(', ')})
    VALUES ${values}`
  },

  update: (tweet, id) => {
    return `
    UPDATE ${TABLE_NAME}
    SET user = '${tweet.user}', tweet = '${tweet.tweet}'
    WHERE id = ${id}`
  },

  deleteUpdate: (id) => {
    return `
    UPDATE ${TABLE_NAME}
    SET deleted_at = '${Utils.dbDate()}'
    WHERE id = ${id}`
  },

  count: () => {
    return `
    SELECT COUNT(*) AS count
    FROM ${TABLE_NAME}
    WHERE deleted_at IS NULL`
  },
}
