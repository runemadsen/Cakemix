function(doc) {
  if (doc.project && doc.created_at) {
    emit(doc.project, null);
  }
};