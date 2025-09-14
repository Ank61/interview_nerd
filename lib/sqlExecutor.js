// SQL Query Executor using SQL.js
// Executes SQL queries against SQLite database in browser

import { sqlDatasets } from "../data/sqlDatasets.js";

class SQLExecutor {
  constructor() {
    this.datasets = sqlDatasets;
    this.currentDataset = null;
    this.db = null;
    this.SQL = null;
    this.isInitialized = false;
  }

  // Initialize SQL.js
  async initializeSQL() {
    if (this.isInitialized) return;
    
    try {
      // Load SQL.js from CDN
      const sqlPromise = window.initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
      });
      
      this.SQL = await sqlPromise;
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize SQL.js:', error);
      throw new Error('Failed to initialize SQL database engine');
    }
  }

  // Load a dataset into SQLite database
  async loadDataset(datasetName) {
    await this.initializeSQL();
    
    if (!this.datasets[datasetName]) {
      throw new Error(`Dataset '${datasetName}' not found`);
    }

    this.currentDataset = datasetName;
    
    // Create new database
    if (this.db) {
      this.db.close();
    }
    this.db = new this.SQL.Database();

    const dataset = this.datasets[datasetName];

    // Create tables and insert data
    Object.keys(dataset.tables).forEach((tableName) => {
      const table = dataset.tables[tableName];
      
      // Create table with proper column types
      const columnDefs = table.columns.map(col => {
        const sampleValue = table.data[0]?.[table.columns.indexOf(col)];
        let type = 'TEXT';
        if (typeof sampleValue === 'number') {
          type = Number.isInteger(sampleValue) ? 'INTEGER' : 'REAL';
        } else if (sampleValue && typeof sampleValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(sampleValue)) {
          type = 'DATE';
        }
        return `${col} ${type}`;
      }).join(', ');
      
      this.db.run(`CREATE TABLE ${tableName} (${columnDefs})`);
      
      // Insert data
      if (table.data.length > 0) {
        const placeholders = table.columns.map(() => '?').join(', ');
        const stmt = this.db.prepare(`INSERT INTO ${tableName} VALUES (${placeholders})`);
        
        table.data.forEach(row => {
          stmt.run(row);
        });
        
        stmt.free();
      }
    });

    return Object.keys(dataset.tables);
  }

  // Execute SQL query
  execute(query) {
    try {
      if (!this.db) {
        throw new Error("No dataset loaded. Please load a dataset first.");
      }

      const normalizedQuery = query.trim().toLowerCase();

      // Handle special commands
      if (normalizedQuery === "show tables" || normalizedQuery.startsWith("show tables")) {
        return this.showTables();
      } else if (normalizedQuery.startsWith("describe") || normalizedQuery.startsWith("desc")) {
        return this.describeTable(query);
      }

      // Execute the query using SQL.js
      const stmt = this.db.prepare(query);
      const result = [];
      
      while (stmt.step()) {
        const row = stmt.getAsObject();
        result.push(row);
      }
      
      const columns = stmt.getColumnNames();
      stmt.free();

      return {
        success: true,
        columns: columns,
        data: result,
        rowCount: result.length,
        query: query,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        query: query,
      };
    }
  }

  // Show available tables
  showTables() {
    try {
      const stmt = this.db.prepare("SELECT name as table_name FROM sqlite_master WHERE type='table'");
      const tables = [];
      
      while (stmt.step()) {
        tables.push(stmt.getAsObject());
      }
      
      stmt.free();
      
      return {
        success: true,
        columns: ["table_name"],
        data: tables,
        rowCount: tables.length,
        query: "SHOW TABLES",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        query: "SHOW TABLES",
      };
    }
  }

  // Describe table structure
  describeTable(query) {
    try {
      const match = query.match(/describe\s+(\w+)|desc\s+(\w+)/i);
      if (!match) {
        throw new Error("Invalid DESCRIBE syntax");
      }

      const tableName = match[1] || match[2];
      
      const stmt = this.db.prepare(`PRAGMA table_info(${tableName})`);
      const columns = [];
      
      while (stmt.step()) {
        const row = stmt.getAsObject();
        columns.push({
          column_name: row.name,
          data_type: row.type,
        });
      }
      
      stmt.free();
      
      if (columns.length === 0) {
        throw new Error(`Table '${tableName}' does not exist`);
      }

      return {
        success: true,
        columns: ["column_name", "data_type"],
        data: columns,
        rowCount: columns.length,
        query: query,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        query: query,
      };
    }
  }

  // Close database connection
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

export default SQLExecutor;
