function contestHistory(...names) {
	resetInfo();
	//if( names.length == 0 ) return;
	//if( name1 == null || name2 == null ) return
	
	var contestInfo = document.getElementById("contestInfo");
	//var names = [name1, name2];
	
	for( var i = 0; i < names.length; i++ ) {
		var vis = ""
		if( names[i].indexOf("Summer 2002") > -1 ) vis = "Summer2002"
		else if( names[i].indexOf("Summer 2003") > -1 ) vis = "Summer2003"
		else if( names[i].indexOf("Summer 2004") > -1 ) vis = "Summer2004"
		else if( names[i].indexOf("Spring 2005") > -1 ) vis = "Spring2005"
		else if( names[i].indexOf("Summer 2005") > -1 ) vis = "Summer2005"
		else if( names[i].indexOf("Summer 2006") > -1 ) vis = "Summer2006"
		else if( names[i].indexOf("Summer 2007") > -1 ) vis = "Summer2007"
		else if( names[i].indexOf("Fall 2008") > -1 ) vis = "Fall2008"
		else if( names[i].indexOf("Winter 2010") > -1 ) vis = "Winter2010"
		else if( names[i].indexOf("Summer 2013") > -1 ) vis = "Summer2013"
		else if( names[i].indexOf("Fall 2018") > -1 ) vis = "Fall2018"
		else {
			arrowed(names[i])
			return
		}
		
		try {
			document.getElementById(vis).style.display = ""
		}
		catch( e ) {
			arrowed(vis)
		}
	}
}

function resetInfo() {
	try {
		var spring2005Tooltip = "<sup title='" 
			+ "I set Sephiroth to 45% to keep him consistent with the Summer 2005 Tournament of Champions."
			+ "'><u>?</u></sup>";
		var summer2006Tooltip = "<sup title='" 
			+ "I set Samus to 40% to make her the #1 non-Link Nintendo character of the bracket. Pretty much any number you plug in here is a matter of opinion (unless you wanted to use the Battle Royale, and nobody wants that)."
			+ "'><u>?</u></sup>";
		var fourWayTooltip = "<sup title='" 
			+ "Raw X-Stats were calculated by comparing to the winner of the match in which the character was eliminated."
			+ "'><u>?</u></sup>";
		var fall2018Tooltip = "<sup title='" 
			+ "Raw X-Stats were calculated by completely ignoring the Double Elimination format (2018 Pikachu > 2018 Mega Man)."
			+ "'><u>?</u></sup>";

		// i'm sure there's a better way to do this. but i just don't care
		document.getElementById("contestInfo").innerHTML =
			"<span style='display:none' id='Summer2002'>Summer 2002 was Basic 1v1. Link = 50%<br/></span>" +
			"<span style='display:none' id='Summer2003'>Summer 2003 was Basic 1v1. Cloud = 50%<br/></span>" +
			"<span style='display:none' id='Summer2004'>Summer 2004 was Basic 1v1. Link = 50%<br/></span>" +
			"<span style='display:none' id='Spring2005'>Spring 2005 was 1v1, Villains. Sephiroth = 45% [NOT 50]" + spring2005Tooltip + "<br/></span>" +
			"<span style='display:none' id='Summer2005'>Summer 2005 was Basic 1v1. Link = 50%<br/></span>" +
			"<span style='display:none' id='Summer2006'>Summer 2006 was 1v1, Male/Female. Samus = 40% [NOT 50]" + summer2006Tooltip + "<br/></span>" +
			"<span style='display:none' id='Summer2007'>Summer 2007 was 4-way. L-Block = 50%" + fourWayTooltip + "<br/></span>" +
			"<span style='display:none' id='Fall2008'>Fall 2008 was 4-way. Link = 50%" + fourWayTooltip + "<br/></span>" +
			"<span style='display:none' id='Winter2010'>Winter 2010 was 1v1, 12 hour matches. Link = 50%<br/></span>" +
			"<span style='display:none' id='Summer2013'>Summer 2013 was 3-way. Draven = 50%<br/></span>" +
			"<span style='display:none' id='Fall2018'>Fall 2018 was 1v1, double matches. Link = 50%" + fall2018Tooltip + "<br/></span>"
	}
	catch( e ) {
		arrowed("contest info");
	}
}