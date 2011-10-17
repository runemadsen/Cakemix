function(doc) {
  if (doc.project && doc.created_at) {
    emit(doc.created_at, null);
  }
};