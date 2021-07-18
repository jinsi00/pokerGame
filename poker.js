const fs = require('fs')
let leonWinList = [];
let judyWinList = [];

function readText(bolb) {
	const gamesList = bolb.split('\n');
	for (let i = 0; i < gamesList.length; i++) {
		if (!gamesList[i]) continue;
		competition(gamesList[i]);
	}
	let outleon = leonWinList.join('\n')
	let outjudy = judyWinList.join('\n')
	downFile(outleon, 'leon')
	downFile(outjudy, 'judy')
}

function downFile(content, filename) {
	fs.writeFile(`./result/${filename}.txt`, content, {
		flag: 'w+'
	}, err => {})
};

function competition(item) {
	if (!item || !item.indexOf(';') == '-1') return false;
	const gameScore = item.split(';')
	const LeonScore = score(gameScore[0]);
	const JudyScore = score(gameScore[1]);
	const LeonEnd = finallyScore(LeonScore);
	const JudyEnd = finallyScore(JudyScore);
	if(!LeonEnd || !JudyEnd) return false;
	if (LeonEnd > JudyEnd) {
		leonWinList.push(item);
	} else {
		judyWinList.push(item);
	}
}

function finallyScore(_person) {
	if (!_person) return false;
	let personEnd = 0;
	personEnd = (_person.handlScore * 1000) + (_person.max.num * 10) + suitAction[_person.max.type]();
	return personEnd
}

const suitAction = {
	'S': function() {
		return 5;
	},
	'H': function() {
		return 4;
	},
	'C': function() {
		return 3;
	},
	'D': function() {
		return 2;
	}
}

function score(person) {
	if (!person) return false;
	const patt =
		/^([S|H|C|D][\dAJQK]{1,2})([S|H|C|D][\dAJQK]{1,2})([S|H|C|D][\dAJQK]{1,2})([S|H|C|D][\dAJQK]{1,2})([S|H|C|D][\dAJQK]{1,2})$/
	const arr = person.match(patt);

	if (!arr) return false;
	let sumScore = 0;
	let max = {
		num: 0,
		type: ''
	};
	let cardTree = {};
	for (let i = 0; i < arr.length; i++) {
		if (!i) continue;
		const card = arr[i].slice(0, 1);

		const point = arr[i].slice(1);
		let num;
		switch (point) {
			case 'A':
				num = 1;
				break;
			case 'J':
				num = 10;
			case 'Q':
				num = 10;
			case 'K':
				num = 10;
				break;
			default:
				num = Number(point);
		}
		sumScore += num
		if (max.num < num) {
			max.num = num;
			max.type = card;
		}
		const currKey = num.toString() == 10 ? '0' : num.toString();
		cardTree[currKey] ? cardTree[currKey].push(arr[i]) : cardTree[currKey] = [arr[i]]
	}
	const handlScore = handlScoreFn(cardTree, sumScore);
	return {
		max,
		handlScore
	}

}

function handlScoreFn(_cardTree, _sumScore) {
	let scoreWin = 0;
	Object.keys(_cardTree).map((key) => {
		const lastKey = ((_sumScore - Number(key)) % 10).toString()
		let result = 0;
		if (key != lastKey) {
			_cardTree[lastKey] ? result = (Number(lastKey) + Number(key)) : result = 0;
		} else {
			_cardTree[lastKey].length > 1 ? result = (Number(lastKey) + Number(key)) : result = 0;
		}
		scoreWin = scoreWin > result ? scoreWin : result
	})
	if (scoreWin > 10) {
		scoreWin = scoreWin - 10
	}
	return scoreWin;
}
module.exports = {
	readText,
	// 以下用于测试
	score,
	suitAction,
	finallyScore,
	competition
}