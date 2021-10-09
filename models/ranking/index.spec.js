let chai = require('chai');
let expect = chai.expect;
let makeRanking = require('./index')

let valid_ranking = {
  site_id: 1,
  group_id: 1,
  ranking: 2,
  month_end: '30/09/2021'
}

describe('makeRanking', () => {
  describe('ranking', () => {
    it('throws error if ranking missing', async () => {
      let errorMessage = 'ranking cannot be null or undefined.'
      expect(() => {
        let {ranking, ...validInfo} = valid_ranking
        makeRanking({ranking: null, ...validInfo})
      }).to.throw(errorMessage)
    })

    it('throws error if ranking is not one of First Second or Third', async () => {
      let errorMessage = 'ranking must be either 1,2 or 3.'
      expect(() => {
        let {ranking, ...validInfo} = valid_ranking
        makeRanking({ranking: 4, ...validInfo})
      }).to.throw(errorMessage)
    })

    it('adds ranking', () => {
      let {ranking, ...validInfo} = valid_ranking
      let newRank = makeRanking({ranking: 1, ...validInfo})
      let input = newRank.ranking
      let actual = 'First'
      expect(input).to.eql(actual)
    })
  })

  describe('site_id', () => {
    it('throws error if site_id missing', async () => {
      let errorMessage = 'site_id cannot be null or undefined.'
      
      expect(() => {
        let {site_id, ...validInfo} = valid_ranking
        makeRanking({site_id: null, ...validInfo})
      }).to.throw(errorMessage)
    })


    it('adds valid site_id', () => {
      let newRank = makeRanking(valid_ranking)
      
      let input = newRank.site_id
      let actual = valid_ranking.site_id
      expect(input).to.eql(actual)
    })

  })

  describe('group_id', () => {
    it('throws error if group_id missing', async () => {
      let errorMessage = 'group_id cannot be null or undefined.'
      expect(() => {
        let {group_id, ...validInfo} = valid_ranking
        makeRanking({group_id: null, ...validInfo})
      }).to.throw(errorMessage)
    })
    
    it('adds group_id', () => {
      let newRank = makeRanking(valid_ranking)      
      let input = newRank.group_id
      let actual = valid_ranking.group_id
      expect(input).to.eql(actual)
    })
  })

  describe('month_end', () => {
    it('throws error if month_end missing', async () => {
      let errorMessage = 'month_end cannot be null or undefined.'
      expect(() => {
        let {month_end, ...validInfo} = valid_ranking
        makeRanking({month_end: null, ...validInfo})
      }).to.throw(errorMessage)
    })
    it('throws error if month_end not a valid date', async () => {
      let errorMessage = 'month_end not valid date format dd/mm/yyyy.'
      expect(() => {
        let {month_end, ...validInfo} = valid_ranking
        makeRanking({month_end: '2021-09-30', ...validInfo})
      }).to.throw(errorMessage)
      
    })
  })


})