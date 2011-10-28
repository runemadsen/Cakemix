function(head, req) {
    
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
		else if (format == "xml") 
		{
        // todo
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