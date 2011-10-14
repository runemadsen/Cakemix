## Cakemix

#### General

Cakemix is a simple way of storing data from ITP projects online, without needing to create a separate database for each project.

Cakemix is designed so that simple projects -- web forms, networked sensors, Processing sketches, whatever -- can easily write data to the web to be retrieved later.

Cakemix lives at http://www.itpcakemix.com, and will accept and store data sent to it at that URL, and will return any data it has stored previously. Those are the only two operations: send data to cakemix; get data from cakemix.

Cakemix provides no security -- no logins or credentials are needed to store or retrieve data, so don't store anything sensitive there.

#### Sending Data

You send data to www.itpcakemix.com/p (for post), organized as 'name=value' pairs, using the http POST method. 

Cakemix expects two standard names: 'user' and 'project', to identify particular collections of data; the rest of the names can be defined by you, and you can use these names to retrieve later the data you store now.

As an example, imagine you have a project where you want to record two pieces of data. You would define a user and project name, and then name the two pieces of data you want to store. Your data might look something like this:

    user=abc123
    project=Hamster_Counter
    hamster_count=187
    need_food=YES

'User' should be an identifier for you -- your netID is an obvious choice, but it can be any identifier you like. 'Project' should be a descriptive name you or others will use to retrieve the data later. The other names -- 'hamster_count' and 'need_food' in this case -- can be anything you like, and can take any values you like. (Cakemix neither requires nor enforces data types.)

If you want to send data to cakemix from the command line, you would do this:

    curl -X POST 'http://www.itpcakemix.com/p?user=abc123&project=Hamster_Counter&hamster_count=187&need_food=YES'

Name=value pairs are concatenated into a URL by separating them with '&' signs. The resulting list, called a query string, is attached to the end of the URL with a '?'. You must put the resulting URL in single quotes if you are using the command line to send the data.

#### Retreiving individual pieces of data

A successful interaction with cakemix will return a 'Success' message, along with a unique ID for that item. For instance, if you ran the curl example above, you would see something like:

    success: http://www.itpcakemix.com/900762271dd7820c9e69132276000e5f

You can retrieve an individual piece of data (from the command line, in this example) by doing a GET request using the unique ID, like this:

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

Cakemix stores and returns data in a format called JSON. (More on JSON: http://www.json.org.) This is just the JSON version of the data you sent to cakemix -- you can see the values for user, project, hamster_count and need_food in there -- plus two internal variables cakemix is keeping track of: _id is the unique identifier for that bit of data,  and created_at is a timestamp.

Storing and retrieving a single piece of data, however, isn't so interesting. Where cakemix is designed to be useful is in storing large volumes of periodic information.

RETRIEVING DATA SETS

The real value of cakemix is retrieving sets of data, where data added over multiple interactions can be retrieved all at once.

Cakemix supports 4 ways of retrieving multiple bits of data: user, project, data range, and time. These can also interact.

A GET request to db.itp.nyu.edu/user/abc123/ will return all data that user has ever stored. 

[[Add examples for project, user+project, data range, recent items, and project+data range and project+recent]]

WE NEED YOU

We need help with three things:

1. Bang on the service to tell us if it works. Does it break with weird names or values? Does it behave if you hit it every second for an hour? And so on. If it breaks or behaves oddly, please tell us how and why?

2. We need examples for POSTing data to and GETing data from cakemix in (at least) Ruby, Python, Processing, Sinatra, Arduino, and PHP. 

3. We need examples for retrieving and working with the resulting JSON in those same languages. Any code you have that works, however grotty, will be much appreciated.

FINE PRINT

Names are case-insensitive, but values are case-sensitive: foo=bar and FOO=bar are the same, but foo=bar and foo=BAR are not.

All values must be in URL-escaped ASCII -- a name=value pair like 

lyrics=Friday, Friday/Gotta get down on Friday

must be rendered as

lyrics=Friday%2C%20Friday%2FGotta%20get%20down%20on%20Friday

Names and values must both be in ASCII. Names can be up to 256 characters long, values 1024.

You cannot have more than 256 names in a single POST request.
