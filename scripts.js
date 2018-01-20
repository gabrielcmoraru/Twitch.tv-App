//Create streamers array
const streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "hireztv", "ninja", "jasonr", "gmdkdsla", "lck_korea", "jovirone", "kimdoe", "trick2g", "yetz", "drekthewiz", "swifty", "gronkhtv", "deadmau5", "eleaguetv", "sacriel", "raizqt",];

//Create constant for Stream, Channel and callback
const lStreams = "https://wind-bow.glitch.me/twitch-api/streams/";
const lChannels = "https://wind-bow.glitch.me/twitch-api/channels/";
const cback = "?callback=";

function refresh(){
	streamers.forEach(function (streamersName){
		//Request Streams for the given streamers
		$.getJSON(lStreams + streamersName + cback, function(dataStreams){
			//Check if Channel is Streaming
			if (dataStreams.stream == null) {
				//If Channel is not Streaming request Channel info
				$.getJSON(lChannels + streamersName + cback, function (dataChannels){
				//Create constant for individual data
				const display_name = dataChannels.display_name;
				const name = dataChannels.name;
				const logo = dataChannels.logo;
				const status = dataChannels.status;
				const url = dataChannels.url;
				const followers = dataChannels.followers;
				const views = dataChannels.views;
				const seen = dataChannels.updated_at.replace('T', ' ').replace('Z', ' ').slice(0,16);
				const memberSince = dataChannels.created_at.slice(0,10);
					//Append data to Content and add the offline class
					$('.content').append("<div class='row generatedRow offline'><div class='col bg-success text-white'><div class='row'><div class='col-lg-2 col-md-3 col-12'><img class='img-fluid generatedImg' src='"
					 + logo +
					 "' alt='"
					 + name +
					 "'></div><div class='col'><h2>"
					 + display_name +
					 "</h2><cite>"
					 + status +
					 "</cite></div><div><div class='row-12 row-lg-4 member'><strong>Member Since: </strong>"
					 + memberSince +
					 "</div><div class='row-12 row-lg-4'><strong>Lastseen: </strong>"
					 + seen +
					 "</div></div></div><div class='row text-center followers'><div class='col'><strong>Followers: </strong>"
					 + followers +
					  "</div><div class='col'><button type='button' class='btn btn-sm btn-danger'><a href='"
					 + url +
					  "' target='_blank' class='nav-item text-white'>OFFLINE</a></button></div><div class='col'><strong><i class='fa fa-eye'  aria-hidden='true'></i> Views: </strong>"
					 + views +
					   "</div></div></div>");
					})
			}
			//If Channel is streaming use data
			else {
				//Create constant for individual data
				const sName = dataStreams.stream.channel.name;
				const sDisplay_name = dataStreams.stream.channel.display_name;
				const sLogo = dataStreams.stream.channel.logo;
				const sFollowers = dataStreams.stream.channel.followers;
				const sUrl = dataStreams.stream.channel.url;
				const sViews = dataStreams.stream.channel.views;
				const sStatus = dataStreams.stream.channel.status;
				const sGame = dataStreams.stream.game.toUpperCase();
				const sLiveViewers = dataStreams.stream.viewers;
				const sLivePreview = dataStreams.stream.preview.medium;
				const sFps = dataStreams.stream.average_fps.toPrecision(4);
				const sLiveSince = dataStreams.stream.created_at.replace('T', ' ').replace('Z', ' ').slice(0,16);
				//Append data to Content and add the online class
				$('.content').append("<div class='row generatedRow online'><div class='col bg-success text-white'><div class='row'><div class='col-lg-2 col-md-3 col-12'><img class='img-fluid generatedImg' src='"
					+ sLogo +
					"' alt='"
					+ sName +
					"'></div><div class='col'><h2>"
					+ sDisplay_name +
					"</h2><cite>"
					+ sStatus +
					"</cite><h3>Playing: </h3><blockqoute>"
					+ sGame +
					"</blockqoute><h4>Live since: </h4><blockqoute>"
					+ sLiveSince +
					"</blockqoute></div><div class='col-12 col-md-4 col-lg-4'><div class='row'><img class='img-fluid img-thumbnail mx-auto' src='"
					+ sLivePreview +
					 "' alt='"
					+ sName +
					 "'></div><div class='row member'><p><i class='fa fa-eye' aria-hidden='true'></i><strong> LIVE</strong> | Viewers: "
					+ sLiveViewers + "</p><div class='col'><p><i class='fa fa-film' aria-hidden='true'></i> "
					+ sFps +
					" <strong>FPS</strong></p></div></div></div<div class='col-lg-2 col-md-4 col-5'></div></div><div class='row text-center followers'><div class='col'><strong>Followers: </strong>"
					+ sFollowers +
					"</div><div class='col'><button type='button' class='btn btn-sm btn-primary'><a href='"
					+ sUrl +
					"' target='_blank' class='nav-item text-white'>WATCH ONLINE NOW</a></button></div><div class='col'><strong><i class='fa fa-eye' aria-hidden='true'></i> Views: </strong>"
					+ sViews +
					"</div></div></div>");
			}

		})
	});
}

//On page load run refresh()
$(document).ready(refresh);

//Online button On click Filter offline, hide offline and show online
$('.btn-outline-warning').click(function(conent){
	$('.offline').filter(function(offline) {
		$('.offline').hide('slow');
		});
	$('.online').show('slow');
});

//Offline button On click Filter online, hide online and show offline
$('.btn-outline-danger').click(function(online){
	$('.online').filter(function(offline) {
		$('.online').hide('slow');
		});
	$('.offline').show('slow');
});

//All button On click show online and offline
$('.btn-outline-dark').click(function(online){
	$('.offline').show('slow/200');
	$('.online').show('slow/200');
});
