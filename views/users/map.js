function(doc) {
  if (doc.user && doc.created_at) {
    emit([doc.user, doc.created_at], null);
  }
};