var test = require('tape')
var dependiff = require('../')

test('local', function(t) {
  t.plan(3)
  dependiff('a.json', 'b.json', { cwd: __dirname }, function(err, diff) {
    t.deepEqual(diff['devDependencies__added'], { tape: "~0.1.0"})
    t.deepEqual(diff['dependencies']['new__added'], "0.0.0")
    t.deepEqual(diff['dependencies']['one'], { __old: '~0.1.0', __new: '~0.2.0' })
  })
})

/*test('remote', function(t) {
  t.plan(1)
  dependiff('mikolalysenko/ao-shader', 'mikolalysenko/voxel-mipmap-demo', { cwd: __dirname, type: 'diffString' }, function(err, diff) {
    console.log(diff)
  })
})*/
