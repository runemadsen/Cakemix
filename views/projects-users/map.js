function(doc) {
  if (doc.project && doc.user && doc.created_at) {
    emit([doc.project, doc.user, doc.created_at], null);
  }
};