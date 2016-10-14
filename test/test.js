var expect = chai.expect
var testkey = 'testkey'

describe('Test cases for scriptsinlocal', function() {

  before(function(){
    localStorage.removeItem(testkey)
  })
  
  describe('Local Storage presence', function(){
    it('Should have localStorage', function() {
        expect(typeof localStorage).to.not.equal('undefined')
    })
  })

  describe('Check that the script key is not present before injection', function() {
    it('Should not have '+testkey+' present in localStorage', function() {
      var data = localStorage.getItem('testkey')
      expect(data).to.be.null
    })
  })
  
  describe('Fetch script and access code', function() {
    it('Should have the injected scripts variable', function(done) {
        scriptsinlocal.require('mock.js','testkey',false,function(){
          expect(window.hello).to.equal('hello world')
          done();
        })
    })
  })

})