function DB(name, tables, schema) {
  this.name = name;
  this.tables = tables;
  this.db = null;
  this.schema = schema;
  this.url = 'static/' + this.name + '/';
}
  
DB.prototype.connect = function() {
  return this.schema.connect()
    .then(function(database) {
      this.db = database;
    }.bind(this))
    // reload only if required
    .then(this.hasTableData.bind(this))
    .then(function(exists){
      console.log("DB Cached:", exists);
      return !exists ? Promise.resolve() : Promise.reject();
    }.bind(this))
    .then(this.importData.bind(this))
    .catch(function(){
      return;
    });
};

DB.prototype.tablePromises = function(tables) {
  var promises = [];
  for(var i = 0; i < tables.length; i++) {
    promises.push(this.importCSV(this.url + tables[i] + '.txt', tables[i]));
  }
  return promises;
};

DB.prototype.importCSV = function(url, name) {
  var table = this.db.getSchema().table(name);
  return this.loadFile(url)
    .then(function(str) {
      var rows = [];
      var lines = str.split('\n');
      // has columns and data
      if(lines.length >= 1) {
        var headers = lines[0].split(',');
        for(var i = 1; i < lines.length; i++) {
          var data = lines[i].split(',');
          // line has data
          if(data.length > 0){
            var obj = {id: i - 1};
            for(var j = 0; j < data.length; j++) {
               obj[headers[j].trim()] = this.nonNull(data[j].trim());
            }
            rows.push(table.createRow(obj));
          }
        }
        if(rows.length > 0) {
          this.db
            .insertOrReplace()
            .into(table)
            .values(rows).exec();
        }
      }
    }.bind(this));
};

DB.prototype.nonNull = function(value) {
  return value ? value : "";
};

DB.prototype.loadFile = function(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject();
      }
    };
    xhr.onerror = reject;
    xhr.send();
  });
};

DB.prototype.importData = function() {
  return Promise.all(this.tablePromises(this.tables));
};

DB.prototype.hasTableData = function() {
  var table = this.db.getSchema().table(this.tables[0]);
  return this.db.select(lf.fn.count(table.id))
    .from(table)
    .exec()
    .then(function(results){
      return results[0]['COUNT(id)'] > 0;
    });
};