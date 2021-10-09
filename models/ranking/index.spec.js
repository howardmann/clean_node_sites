let chai = require('chai');
let expect = chai.expect;
let makeRanking = require('./index')

describe('makeRanking', () => {
  describe.only('ranking', () => {
    it('throws error if ranking missing', async () => {
      let errorMessage = 'ranking cannot be null or undefined.'
      expect(() => {
        makeRanking({ranking: null})
      }).to.throw(errorMessage)
    })

    it('throws error if ranking is not one of First Second or Third', async () => {
      let errorMessage = 'ranking must be either 1,2 or 3.'
      expect(() => {
        makeRanking({ranking: 4})
      }).to.throw(errorMessage)
    })

    it('adds ranking', () => {
      let input = makeRanking({ranking: 1}).ranking
      let actual = 'First'
      expect(input).to.eql(actual)
    })
  })

  describe('site_id', () => {
    it('throws error if site_id missing', async () => {
      let errorMessage = 'site_id cannot be null or undefined.'
      expect(() => {
        makeRanking({site_id: null})
      }).to.throw(errorMessage)
    })
    it('throws error if site_id does not exist', async () => {
      let errorMessage = 'site_id not found.'
      expect(() => {
        makeRanking({site_id: 42424242})
      }).to.throw(errorMessage)
    })
  })

  describe('group_id', () => {
    it('throws error if group_id missing', async () => {
      let errorMessage = 'group_id cannot be null or undefined.'
      expect(() => {
        makeRanking({group_id: null})
      }).to.throw(errorMessage)
    })
    it('throws error if group_id does not exist', async () => {
      let errorMessage = 'group_id not found.'
      expect(() => {
        makeRanking({group_id: 42424242})
      }).to.throw(errorMessage)
    })
  })

  describe('month_end', () => {
    it('throws error if month_end missing', async () => {
      let errorMessage = 'month_end cannot be null or undefined.'
      expect(() => {
        makeRanking({
          month_end: null
        })
      }).to.throw(errorMessage)
    })
    it('throws error if month_end not a valid date', async () => {
      let errorMessage = 'month_end not valid date format dd-mm-yyyy.'
      expect(() => {
        makeRanking({
          month_end: '2021-02-02'
        })
      }).to.throw(errorMessage)
    })
  })


})