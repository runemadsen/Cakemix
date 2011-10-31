function(head, req) {
	
		function sendCSV(obj)
		{
		    var row = "";
				var first = true;

				for (var key in obj)
				{
					if (obj.hasOwnProperty(key))
					{
						if(!first)
						{
							row = row.concat(",");
						}
						else
						{
							first = false;
						}

						var value = key + ":" + obj[key];

		        if (typeof value != 'undefined' && value !== null)
						{
							row = row.concat(value);
						}
					}    
		    }

				send(row.concat("\n"));
		};
    
		function sendJSON(obj, first) {
        var seperator = first ? "" : ",\n";
        send(seperator + JSON.stringify(obj, null, " "));
    };

    var format = req.query.format;
		var callback = req.query.callback;
		var row;
		var first = true;
        
    if (format == "raw") 
		{
        send('{"rows":[\n');
        while (row = getRow()) 
				{
            sendJSON(row, first);
            first = false;
        }
        send(']}');
    } 
		else if (format == "csv") 
		{
				while (row = getRow()) 
				{
					  delete row.doc._rev;
	          sendCSV(row.doc);
	      }
    }
		else if (format == "icm") 
		{
				while (row = getRow()) 
				{
					  delete row.doc._id;
					  delete row.doc._rev;
	          sendCSV(row.doc);
	      }
    }
		else 
		{ 		
				if(callback) send(callback+"("); // if jsonp, wrap in function
				
        send('[');
        while (row = getRow()) {
            if (row.doc) {
                delete row.doc._rev;
                sendJSON(row.doc, first);
            } else {
                delete row.value;
                sendJSON(row, first);
            }
            first = false;
        }
        send(']');

				if(callback) send(");"); // if jsonp, wrap in function
    }
};