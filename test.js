const assert = require('assert');
const poker = require('./poker.js');

describe('winner', function() {
	describe('score():计算手牌点数的得分与最大点的那张牌的点数及花色', function() {
		it('当传入手牌是标准格式时返回最大点牌卡与手牌得分', () => {
			const result = poker.score('H9S7CAC2D7')
			const handlScore = result.handlScore;
			const maxType = result.max.type;
			const maxNum = result.max.num;
			assert.equal(handlScore, 6);
			assert.equal(maxType, 'H');
			assert.equal(maxNum, 9);
		});
		it('当传入手牌为undefined时', () => {
			const result = poker.score(undefined)
			assert.equal(result, false);
		});
		it('当传入手牌不是正常花色时', () => {
			const result = poker.score('H9S7MAC2D7')
			assert.equal(result, false);
		});
		it('当传入手牌不是5张牌时', () => {
			const result = poker.score('H9S7CAC2D7C8')
			assert.equal(result, false);
		});
	});
	describe('suitAction:将最大手牌花色换得分S/H/C/D对应5/4/3/2', function() {
		['D', 'C', 'H', 'S'].map((x, index) => {
			const maxTypeScore = poker.suitAction[x]();
			const shouldScore = index + 2;
			it(`当传入最大点花色为${x}时的返回值为${shouldScore}`, () => {
				assert.equal(maxTypeScore, shouldScore);
			})
		})
	});
	describe('finallyScore():将Leon&Judy的手牌换算成最终得分', function() {
		it('leon获胜情况下:C9D7D9S7D2;HAC5S8D8C10为Leon{ max: { num: 9, type: "C" }, handlScore: 4};Judy{max: { num: 10, type: "C" }, handlScore: 0}',
			() => {
				const Leons = { max: { num: 9, type: "C" }, handlScore: 4 }
				const Judys = { max: { num: 10, type: "C" }, handlScore: 0 }
				const LeonEnd = poker.finallyScore(Leons)
				const JudyEnd = poker.finallyScore(Judys)
				assert.equal(LeonEnd, 4093);
				assert.equal(JudyEnd, 103);
			})
		it('当Leon或Judy记录不对时',()=>{
			const wrongLeons = poker.finallyScore(false)
			const wrongJudys = poker.finallyScore()
			assert.equal(wrongLeons, false);
			assert.equal(wrongJudys, false);
		})
	})
	describe('competition():当某场比赛记录没有分号《C4C9H4H7CKC3H6D3S9D8》& 空行时',function(){
		const wrongPoint = poker.competition('C4C9H4H7CKC3H6D3S9D8')
		const wrongEmpty = poker.competition()
		assert.equal(wrongPoint, false);
		assert.equal(wrongEmpty, false);
	})
})
