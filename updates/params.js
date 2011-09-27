function(doc, req) 
{
    var doc = req.query || {},
        form = req.form;
    doc._id = req.uuid;
    doc.created_at = new Date();
    for (var field in form) {
        if (form.hasOwnProperty(field)) {
            doc[field] = form[field];
        }
    }
    var url = "http://"+req.headers.Host+"/"+req.path[0] + "/" +doc._id;
    return [doc, "success: "+url+"\n"];
};