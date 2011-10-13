function(doc) {
    var point = {"type":"Point","coordinates":[parseFloat(doc.lon), parseFloat(doc.lat)]};
    emit(point, null);
};