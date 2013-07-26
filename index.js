var fs = require('fs')
var path = require('path')
var request = require('request')
var jsondiff = require('json-diff')

function Dependiff(opts) {
  opts = opts || {}
  this.options = opts || {}
  this.options.cwd = opts.cwd || process.cwd()
  this.options.metafile = opts.metafile || 'package.json'
  this.options.keys = opts.keys || ['dependencies', 'devDependencies', 'peerDependencies']
  this.options.type = opts.type || 'diff'
}
module.exports = function(a, b, opts, done) {
  if (typeof opts === 'function') {
    done = opts
    opts = {}
  }
  var d = new Dependiff(opts)
  d.run(a, b, done)
  return d
}
module.exports.Dependiff = Dependiff

Dependiff.prototype.run = function(a, b, done) {
  var self = this
  var metas = Object.create(null)
  function reallydone() {
    if (Object.keys(metas).length > 1) {
      var diff = jsondiff[self.options.type](self._onlyKeys(metas['a']), self._onlyKeys(metas['b']))
      done(null, diff)
    }
  }
  this._getJSON(a, function(err, json) {
    if (err) return done(err)
    metas['a'] = json
    reallydone()
  })
  this._getJSON(b, function(err, json) {
    if (err) return done(err)
    metas['b'] = json
    reallydone()
  })
}

Dependiff.prototype._getJSON = function(str, done) {
  var filepath = path.resolve(this.options.cwd, str)
  if (fs.existsSync(filepath)) {
    fs.readFile(filepath, function(err, buf) {
      try {
        done(null, JSON.parse(String(buf)))
      } catch (err) {
        done(new Error(err.message + ' with [' + filepath + ']'))
      }
    })
  } else {
    if (str.slice(0, 4) !== 'http') str = 'https://raw.github.com/' + trimslash(str) + '/master/' + this.options.metafile
    request(str, function(err, res, body) {
      if (err) return done(err)
      try {
        done(null, JSON.parse(String(body)))
      } catch (err) {
        done(new Error(err.message + ' with [' + str + ']'))
      }
    })
  }
}

Dependiff.prototype._onlyKeys = function(obj) {
  var res = Object.create(null)
  this.options.keys.forEach(function(k) {
    if (obj.hasOwnProperty(k)) {
      res[k] = {}
      var keys = Object.keys(obj[k])
      keys.sort()
      keys.forEach(function(key) {
        res[k][key] = obj[k][key]
      })
    }
  })
  return res
}

function trimslash(str) {
  if (str.slice(0, 1) === '/') str = str.slice(1)
  if (str.slice(-1) === '/') str = str.slice(0, -1)
  return str
}
