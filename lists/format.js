function(head, req) {
    function sendJSON(obj, first) {
        var seperator = first ? "" : ",\n";
        send(seperator + JSON.stringify(obj, null, " "));
    };
    var format = req.query.format
        , row
        , first = true
        ;
    if (format == "raw") {
        send('{"rows":[\n');
        while (row = getRow()) {
            sendJSON(row, first);
            first = false;
        }
        send(']}');
    } else if (format == "xml") {
        // todo
    } else { // default to "lean"
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
    }
};