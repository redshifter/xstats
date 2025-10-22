function runGameList(thisGame) {
	var text =
		"<p><strong>Other Modes</strong><br/>" +
			(thisGame != "daily"
				? "<a href='daily.html'>Daily X-Stats</a>"
				: "Daily X-Stats"
			) +
		"<br/>" +
			(thisGame != "bracket"
				? "<a href='bracket.html'>Weekly Bracket</a>"
				: "Weekly Bracket"
			) +

		"<br/>" + 
		"<br class='finePrint'/>" + // make a separator
			(thisGame != "x-stats"
				? "<a href='streak.html'>Winning Streak!</a>"
				: "Winning Streak!"
			) +
		"<br/>" +
			(thisGame != "sicko"
				? "<a href='streak.html?mode=sicko'>Sicko Mode</a>"
				: "Sicko Mode"
			) +
		"<br/>" +
			(thisGame != "balance"
				? "<a href='streak.html?mode=balance'>Balance Mode</a>"
				: "Balance Mode"
			) +
		"<br/>" +
			(thisGame != "royale"
				? "<a href='streak.html?mode=royale'>Royale Mode</a>"
				: "Royale Mode"
			) +
			newGameIndicator("2025-10-19") +

		"<br/>" + 
		"<br class='finePrint'/>" + // make a separator
			(thisGame != "contest"
				? "<a href='streak.html?mode=contest'>Days of the Contest</a>"
				: "Days of the Contest"
			) +
			newGameIndicator("2025-10-21") +
			
		"</p>" +
		"<br/>" +
		"<p>" +
			"<span class='fineprint'>" + 
				"<strong>lol xstatsle by Red Shifter, 2025</strong>" +
			"</span><br/>" +
			"<span class='footdive'>" + 
				"Thanks to a lot of people that will be difficult to name" + "<br/>" +
				"Special thanks to CJayC, as required on all GameFAQs-related things" + "<br/>" +
				"Special thanks to SBallen for continuing the contests into their dark ages" + "<br/>" +
			"</span>" + 
		"</p>"
	;
	document.getElementById("gameList").innerHTML = text
}

function newGameIndicator(gameDate) {
	var year = gameDate.substring(0,4);
	var month = gameDate.substring(5,7);
	var day = gameDate.substring(8,10);

	// the month starts at zero. this is why nobody likes working with dates
	var terminus = Date.UTC(+year, (+month) - 1, (+day) + 28); // let's make the "new" time 4 weeks i guess?

	var d = new Date()
	var today = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

	if( today < terminus ) {
		// new game!
		return " <sup class='fineprint' style='color:FF4040' title='Game added " + gameDate + "'><u>(new!)</u></sup>"
	}
	else {
		return "";
	}
}