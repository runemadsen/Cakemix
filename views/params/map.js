function(doc)
{
	var k;
	for(k in doc) {
		if((k.indexOf("_")) != 0 && doc.hasOwnProperty(k)) {
			var string = JSON.stringify(doc[k]);
			if(string.length > 1000)
			{
				emit([k, string.substr(0, 500), doc.created_at], null);
			}
			else
			{
				emit([k, doc[k], doc.created_at], null);
			}
		}
	}
}