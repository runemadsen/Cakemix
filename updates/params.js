function(doc, req) 
{
    var doc = {},
        query = req.query,
        form = req.form,
        field;
    
    function maybeNumberify(string) {
        if (string == "NaN") {
            return string; // edge case
        }
        var asNum = parseFloat(string);
        if (asNum.toString() == string) {
            return asNum;
        } else {
            return string;
        }
    };

    doc._id = req.uuid;
    doc.created_at = new Date();
    for (field in form) {
    	if (form.hasOwnProperty(field)) {
            doc[field] = maybeNumberify(form[field]);
        }
    }
    for (field in query) {
    	if (query.hasOwnProperty(field)) {
            doc[field] = maybeNumberify(query[field]);
        }
    }
    var url = "http://" + req.headers.Host + "/" + doc._id;
    return [doc, "success: "+url+"\n"];
};