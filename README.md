### Introduction

Cakemix is a simple way of storing data from ITP projects online, without needing to create a separate database for each project. It was written by Rune Madsen using CouchDB(.org), with input from Chris Anderson, creator of CouchDB, and from Clay Shirky and Greg Borenstein. 

Cakemix is designed so that simple projects -- web forms, networked sensors, Processing sketches, whatever -- can easily write data to the web to be retrieved later.

Cakemix lives at http://www.itpcakemix.com. It will accept and store data sent to it, and will return any data it has stored previously. Those are the only two operations: send data to cakemix; get data from cakemix.

Cakemix provides no security -- no logins or credentials are needed to store or retrieve data, so don't store anything sensitive there.

This is alpha software; if you would like to help, see What We Need, at the end of this document.

### Sending Data

You send data for Cakemix to story by using the http POST method, to the URL www.itpcakemix.com/add.

The data you send must be organized as 'name=value' pairs. Cakemix expects two standard names: 'user' and 'project', to identify particular collections of data; the rest of the names can be defined by you, and you can use these names to retrieve later the data you store now.

As an example, imagine you have a project where you want to record two pieces of data. You would define a user and project name, and then name the two pieces of data you want to store. Your data might look something like this:

    user=abc123
    project=Hamster_Counter
    hamster_count=187
    need_food=YES

'User' should be an identifier for you -- your netID is an obvious choice, but it can be any identifier you like. 'Project' should be a descriptive name you or others will use to retrieve the data later. The other names -- 'hamster_count' and 'need_food' in this case -- can be anything you like, and can take any values you like. (Cakemix neither requires nor enforces data types.)

Names are case-INsensitive, values are case sensitive. foo=bar and FOO=bar are identical, but are different from foo=Bar and foo=BAR.

Name=value pairs are concatenated into a URL by separating them with '&' signs. The resulting list, called a query string, is attached to the end of the URL with a '?'. 

If you want to send data to cakemix from the command line, you would do something like this:

    curl -X POST 'http://www.itpcakemix.com/add?user=abc123&project=Hamster_Counter&hamster_count=187&need_food=YES'
    
(As you can see, when using Cakemix from the command line, you must put the resulting URL in single quotes.)

All the data sent by a single interaction with the system, plus the timestamp generated by Cakemix about the interaction is stored as a JSON document. All intformation you send in is stored in such documents. Each POST to Cakemix generates one such document. Every document has a unique ID associated with it for later use.

### Retrieving individual pieces of data

Retreiving data from Cakemix involved doing an http GET request on a URL formatted to specify a particular set of data.

The simplest example would involve retrieving a single document. A successful POST of data to the system will return a 'Success' message, along with a URL bearing the unique ID for that document. For instance, if you ran the curl example above, you would see something like:

    success: http://www.itpcakemix.com/900762271dd7820c9e69132276000e5f

You can retrieve an individual piece of data (from the command line, in this example) by doing a GET request on the URL with the unique ID, like this:

    curl http://www.itpcakemix.com/900762271dd7820c9e69132276000e5f

This would return the data in a format that looks like this: 

    {
      "_id":"1ad79d80649a4c474eb667361800075d",
      "user":"abc123",
      "project":"Hamster_Counter",
      "hamster_count":"187",
      "need_food":"YES",
      "created_at":"2011-09-30T17:02:08.563Z"
    }

Cakemix stores and returns data in a format called JSON. (More on JSON: http://www.json.org.) This is just the JSON version of the data you sent to cakemix -- you can see the values for user, project, hamster_count and need_food in there -- plus three internal variables cakemix is keeping track of: _id is the unique identifier for that bit of data, and created_at is a timestamp. 

Storing and retrieving a single piece of data, however, isn't so interesting. Where cakemix is designed to be useful is in storing large volumes of periodic information.

### Retrieving data sets

The real value of cakemix is retrieving sets of data, where data added over multiple interactions can be retrieved all at once. Multiple documents can be retreived using an http GET request on URLs composed to pring back particular collections of documents.

**Getting all data for a user**  
A GET request to `www.itpcakemix.com/user/abc123/` will return all data stored under that user ID, whatever the project. 

**Getting all data for a project**  
A GET request to `www.itpcakemix.com/project/cats/` will return all data stored under the project named "cats".

**Getting all data for a project and a user**  
A GET request to `www.itpcakemix.com/project/cats/user/abc123` will return only the data for the project named "cats" that also bears the user ID "abc123". 

**Getting all data for a custom name**  
A GET request to `www.itpcakemix.com/need_food/YES` will return all data that has a name of "need_food" and a value of "YES". This feature allows you to filter on custom fields. IT WILL BE SLOWER than retreiving data using just project and user fields, at least on large collections. 

### Options

By default, returned data will be sorted in reverse chronological order (which is to say, descending by their created date), so that the first document returned is the most recent.

In addition to this default, Cakemix will let you limit the total number of documents returned, using a query string appended to the URL specifying the collection you want to receive. 

**Limiting the number of returned items**
A GET request with a trailing `?limit=number` will limit the returned items to that specific number. E.g. `www.itpcakemix.com/project/cats/user/abc123?limit=5` will return the 5 newest items
 
We plan to add other options to Cakemix, but for now, limit is the only such option.

### What We Need 

Comments, questions and observations to rune@runemadsen.com and/or clay@shirky.com

Bang on this. Where does it break? What bad surprises does it create?

Show us examples. Did you try this? Was it useful? How? Not useful? Why not?

Give us code. We need examples for using Cakemix in Processing, Arduino, PHP, Ruby (Sinatra), Python, etc.

Tell us what features you would like in the next iteration?

Tell us how to imporve the documentation. This is meant to be easy to use, which means being easy to understand, which means good documentation. What will improve that? If you're a Github user please fork this repository, edit the README documentation, and send a pull request. 

### The Name

"Cakemix" refers to something where the ingredients have been put together in advance of your needing them. 

It also refers to the mid-20th century American song "If I Knew You Were Comin' I'd've Baked a Cake" -- Cakemix is designed to receive data from any user or project without needing to know in advance that data would be showing up.

Thanks to Rune, the cake is not a lie.

### Code Samples: Javascript/jQuery/JSONP

If you want to get data from Cakemix via Javasscript, using jQuery, then you need to use JSONP (JSON with Padding;  `http://en.wikipedia.org/wiki/JSONP`). Because your javascript is on one server and the Cakemix API is on another, browsers will block the request for data sent to Cakemix unless you use JSONP, which allows server-to-server communication via the &#60;script&#60; tag. 

Here is an example on how you would do a call to the Cakemix API with jQuery:

    $.ajax({
      type: "GET",
      url: "http://www.itpcakemix.com/project/cats",
      dataType: "jsonp",
      success : function(data) {
        alert(data);
     }
    });