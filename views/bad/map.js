function(doc) {
    if (!(doc.user && doc.project)) {
        emit(doc.created_at, null)
    }
};