var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // inserts data into the database on load --need to add on button click
		$(document).ready(function()
		{
			$("#insert").click(function() 
			{
				var clubid="5"
				var teamname="The Lions";
				var dataString="clubID="+clubid+"&teamName="+teamname+"&insert=";
				if($.trim(clubid).length>0 & $.trim(teamname).length>0)
				{
					$.ajax({
						type: "POST",
						url:"http://catchthedragon.ca/insert.php",
						data: dataString,
						crossDomain: true,
						cache: false,
						success: function(data){
							if(data=="ok")
							{
								alert("inserted");
							}
							else if(data=="error")
							{
								alert("error");
							}
						}
					});
				}
				return false;
			});
		});

        console.log('Received Event: ' + id);
    }
};
