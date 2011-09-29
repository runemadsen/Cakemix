function(doc) {
  if (doc.project && doc.user) {
    emit([doc.project, doc.user], doc);
  }
};