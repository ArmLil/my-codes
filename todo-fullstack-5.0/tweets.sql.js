const TABLE_NAME = 'tweetsTable'

const DEFAULT_COLUMNS = ['created_at DATETIME DEFAULT CURRENT_TIMESTAMP', 'updated_at DATETIME DEFAULT CURRENT_TIMESTAMP', 'deleted_at DATETIME']
const COLUMNS_CREATE = ['id INTEGER PRIMARY KEY AUTOINCREMENT', 'user TEXT', 'tweet TEXT', 'colour TEXT']
const COLUMNS = ['user', 'tweet', 'colour']

module.exports = {
  tableName: TABLE_NAME,
  columns: COLUMNS,
  createTable: `CREATE TABLE if not exists ${TABLE_NAME} (${(COLUMNS_CREATE.concat(DEFAULT_COLUMNS)).join(', ')})`
}
