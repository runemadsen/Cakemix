function(doc) {
  if (doc.project) {
    emit(doc.project, doc);
  }
};