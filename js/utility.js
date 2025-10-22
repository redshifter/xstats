function buildMatchResult(match, count, choice, xstats) {
	var answer = ["✔️", "❌"]
	var box1 = ""
	var box2 = ""
	var oops = ""
	
	if( xstats != null ) {
		if( choice == null ) {
			oops = answer[1] + match.choice + " (N/A)<br/>"
		}
		else if( choice == xstats ) {
			if( choice ) box2 = answer[0]; else box1 = answer[0];
		}
		else {
			if( choice ) box2 = answer[1]; else box1 = answer[1];
		}
	}
	
	var text = 
			box1 + match.ch1 + " (" + match.v1 + "%) <span class='smallerPrint'>[" + match.x1 + "]</span><br/>" +
			box2 + match.ch2 + " (" + match.v2 + "%) <span class='smallerPrint'>[" + match.x2 + "]</span><br/>" +
			oops +
			//"<span class='fineprint'>Difficulty: " + getDifficulty(match.win) + "</span>"
			"<span class='fineprint'>Difficulty: " + getNewDifficulty(match.x1, match.x2) + "</span>"

	if( count > 0 ) {
		return "<p><strong>Match " + count + "</strong><br/>" + text + "</p>"
	}
	else {
		return text
	}
}

function getNewDifficulty(xstat1, xstat2) {
	// start by calculating win percentage
	var x1 = xstat1;
	var x2 = xstat2
	// if this is not already a win percentage, make it so
	if( 100 - Math.abs(xstat1+xstat2) > 0.2 ) { // i still don't trust floats
		x1 = adjust(xstat1, xstat2)
		x2 = adjust(xstat2, xstat1)
	}
	var x = Math.max(x1,x2)

	// these thresholds were decided by using an (outdated) spreadsheet against a thousand matches. eh it's probably fine
	if( x <= 50.00 ) {
		return "BUGGED" // there's supposed to be validation to keep a tie from happening. please report this
	}
	else if( x < 50.50 ) {
		return "LUSTER LEGENDARY!!!" // 1.4% (1.4%)
	}
	else if( x < 51.50 ) {
		return "SUPER LEGENDARY!" // 2.5% (3.9%)
	}
	else if( x < 53.00 ) {
		return "LEGENDARY" // 3.1% (7.0%)
	}
	else if( x < 57.00 ) {
		return "Very Hard" // 9.6% (16.6%)
	}
	else if( x < 64.00 ) {
		return "Hard" // 23.3% (39.9%)
	}
	else if( x < 73.00 ) {
		return "Medium" // 28.3% (68.2%)
	}
	else if( x < 82.00 ) {
		return "Easy" // 20.1% (88.3%)
	}
	else {
		return "Very Easy" // 11.7% (100.0%)
	}	
}

function getDifficulty(val) {
	// these thresholds were decided by using an (outdated) spreadsheet against a thousand matches. eh it's probably fine
	var x = Math.abs(val)
	if( x == 0 ) {
		return "BUGGED" // there's supposed to be validation to keep a tie from happening. please report this
	}
	else if( x < 0.16 ) {
		return "LUSTER LEGENDARY!!!" // 1.0% (1.0%)
	}
	else if( x < 0.60 ) {
		return "SUPER LEGENDARY!" // 2.5% (3.5%)
	}
	else if( x < 1.40 ) {
		return "LEGENDARY" // 6.5% (10.0%)
	}
	else if( x < 2.90 ) {
		return "Very Hard" // 10.0% (20.0%)
	}
	else if( x < 6.15 ) {
		return "Hard" // 20.0% (40.0%)
	}
	else if( x < 11.4 ) {
		return "Medium" // 25.0% (65.0%)
	}
	else if( x < 18.0 ) {
		return "Easy" // 20.0% (85.0%)
	}
	else {
		return "Very Easy" // 15.0% (100.0%)
	}
}

function bookMatch(a, b) {
	match = {
		"ch1":datnm[a],
		"ch2":datnm[b],
		"x1":datx[a],
		"x2":datx[b],
		"win":(datx[a] - datx[b]),
	};

	return formatMatch(match)
}

function formatMatch(match) {
	match.v1 = adjust(match.x1, match.x2)
	match.v2 = adjust(match.x2, match.x1)
	match.winv = Math.max(match.v1, match.v2)

	return match
}

function generateDailyData() {
	// burn a seed every time you update this!
	for( var i = 0; i < 2; i++ ) random()

	// draw a bunch of completely random matches
	var gen = []
	for( var i = 0; i < 30; i++ ) {
		var obj = null
		var a = Math.floor(random() * datmax)
		var b = Math.floor(random() * datmax)
		
		if( a != b && datx[a] != datx[b] ) {
			obj = bookMatch(a,b)

			var val = Math.abs(datx[a] - datx[b])
			for ( var j = 0; j < i; j++ ) {
				// all matches must have a distinct win value (this used to be because the sorting algorithm was dogshit, but now it just feels right)
				if( Math.abs(gen[j].win) == val ) {
					obj = null
					break;
				}
				// all matches must have unique characters
				if( gen[j].ch1 == obj.ch1 || gen[j].ch1 == obj.ch2 || gen[j].ch2 == obj.ch1 || gen[j].ch2 == obj.ch2 ) {
					obj = null
					break;
				}
			}
		}
		
		if( obj == null ) {
			i--;
		}
		else {
			gen[i] = obj
		}
	}

	//gen = gen.sort((a,b) => Math.abs(b.win) - Math.abs(a.win));
	gen = gen.sort((a,b) => b.winv - a.winv);

	// sort matches such that:
	// #1 is 0-2
	// --- skip a few
	// #2 is 10-14
	// #3 is 15-19
	// #4 is 20-24
	var output = [
		gen[ 0 + Math.floor(random() * 3)],
		gen[10 + Math.floor(random() * 5)],
		gen[15 + Math.floor(random() * 5)],
		gen[20 + Math.floor(random() * 5)],
	];

	// #5 is the match 25-28 with the strongest possible characters (excluding anyone with a 50 xstat because we know who won those)
	var finals;
	var epic = 0
	for( var i = 25; i < 29; i++ ) {
		if( gen[i].x1 < 50 && gen[i].x2 < 50 ) {
			if( gen[i].x1 + gen[i].x2 > epic ) {
				epic = gen[i].x1 + gen[i].x2
				finals = gen[i]
			}
		}
	}
	if( finals == null ) finals = gen[28]
	output[4] = finals

	// #6 is just the hardest match
	output[5] = gen[29]

	/*
	// i could do a good sorting algorithm but i'm bored
	// this will put the easiest at the start, the hardest at the end, and keep the random order decided for the others
	var minv = 50
	var maxv = 0
	for( var i = 0; i < gen.length; i++ ) {
		var v = Math.abs(gen[i].win);
		if( v < minv ) minv = v
		if( v > maxv ) maxv = v
	}
	var j = 1
	for( var i = 0; i < gen.length; i++ ) {
		var v = Math.abs(gen[i].win);
		if( v == maxv ) sortGen[0] = gen[i]
		else if( v == minv ) sortGen[5] = gen[i]
		else {
			sortGen[j] = gen[i]
			j++
		}
	}
	*/
	
	return output;	
}

function adjust(myVal, enemyVal) {
	// proper adjustment (thanks to metal for pointing out that this was wrong)
	var winx = Math.max(myVal, enemyVal);
	var multiplier = 50 / winx;

	var loserPercent = Math.min(myVal * multiplier, enemyVal * multiplier)
	if( myVal < enemyVal ) {
		return Math.round(loserPercent * 100) / 100
	}
	else {
		return Math.round((100 - loserPercent) * 100) / 100
	}
}
/*
function adjust(myVal, enemyVal) {
	var val = Math.floor(
		(myVal/(myVal+enemyVal)) * 10000
	) / 100;
	
	if( val > 50 ) val += 0.01
	
	val = Math.floor(val * 100) / 100
	
	return val
}
*/

function startMatch(match) {
	if( window.innerWidth > window.innerHeight ) {
		// desktop
		document.getElementById("activeGame").innerHTML = 
			'<input type="button" id="topOp" value="Summer 2002 Link" onclick="vote(1)" class="butt" />'
			+ ' vs '
			+ '<input type="button" id="bottomOp" value="Summer 2004 Tanner" onclick="vote(-1)" class="butt" />';
	}
	else {
		// mobiler
		document.getElementById("activeGame").innerHTML = 
			'<p><input type="button" id="topOp" value="Summer 2002 Link" onclick="vote(1)" class="butt" /></p>'
			+ '<p>vs</p>'
			+ '<p><input type="button" id="bottomOp" value="Summer 2004 Tanner" onclick="vote(-1)" class="butt" /></p>';
	}
	
	var button = [
		document.getElementById("topOp"),
		document.getElementById("bottomOp")
	]

	button[0].value = match.ch1
	button[1].value = match.ch2
	
	for( var i = 0; i < 2; i++ ) {
		button[i].style.backgroundColor = randomColor()
	}
	
	contestHistory(match.ch1, match.ch2);
}