function(doc, req) {
    if (req.query) {
        if (req.query.user && req.query.project) {
            return (req.query.user == doc.user && req.query.project == doc.project);
        } else if (req.query.user) {
            return (req.query.user == doc.user);            
        } else if (req.query.project) {
            return (req.query.project == doc.project);
        }
    }
};