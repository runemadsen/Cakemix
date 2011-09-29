function(doc) {
  if (doc.user) {
    emit(doc.user, doc);
  }
};