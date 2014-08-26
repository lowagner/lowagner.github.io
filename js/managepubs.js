// GLOBAL parameters YOU CAN SET
var pubsMAXpp = 5; // max number of publications to display per page
var pubsSHOWbackTOtopAFTER = 3;  // after X publications, show the back to top link.  this should NOT be greater than or equal to pubsMAXpp.

// SET INTERNALLY IN THE CODE
var pubsDISPLAYED = 0; // number of pubs displayed
var pubsMIN = 0; // index of which record (of the records filtered) to start displaying
var pubsMAX = 0; // index of which record is last to display.
var pubsBEFORE = false; // if there were any publications before pubsMIN
var pubsAFTER = false; // if there were any publications after pubsMAX

if ( pubsSHOWbackTOtopAFTER >= pubsMAXpp )
    pubsSHOWbackTOtopAFTER = pubsMAXpp-1;

function getpeople( authors ) {
    // grab all but last "and" in the author list.
    authors=authors.split(' and');
    if ( authors.length > 8 )
    {
        // long author lists suck!
        authors=authors[0]+", <i>et al</i>";
    }
    else if ( authors.length > 2 )
    {
        authors=authors.slice(0,-1).join(',') + ", and"+authors.slice(-1);
        //authors.join(', aasdfnd');
    }
    else if ( authors.length == 2 )
    {
        authors=authors.slice(0,-1).join('') + " and"+authors.slice(-1);         
    }
    else
    {
        authors.join('');
    }
    return authors;
};

function writepub( record, recordnumber ) {
    // get the number id.  "lowid".
    var nutxt = "";
    var bibtex = "BIBTEX entry\\n\\n";
    // check if the id is an integer.  if so, then we can print it.
    if ( (record["lowid"] | 0) === record["lowid"] )
        nutxt = record["lowid"];
    else
        nutxt = "*";
    // if the id wasn't integer, just make it an asterisk.
    bibtex += "@"+record["style"]+"{lowagner"+record["lowid"]+",\\n";
    var authors = getpeople( record['author'] );
    bibtex += "    author = {"+record["author"]+"},\\n";
    document.write('<li><table><tr><td class=number>'+nutxt+'.</td><td class=wideentry>'+authors+", ");

    // now get the title of the work, and add a link if we can.
    if ( record["eprint"] !== undefined )
    {
        // if we have the eprint available (pdf on site), then use that.
        nutxt="<a href=\""+record["eprint"]+"\" target=low"+record["lowid"]+">"+record["title"]+"</a>, ";
    }
    else
    { 
        if ( record["url"] !== undefined )
        {
            // if we have a url to the legit site, then use that.
            nutxt="<a href=\""+record["url"]+"\" target=low"+record["lowid"]+">"+record["title"]+"</a>, ";
        }
        else
        {
            // no pdf or url, don't link anything.
            nutxt=record["title"]+", ";
        }
    }
    bibtex += "    title = {"+record["title"]+"},\\n";
    bibtex += "    url = {"+record["url"]+"},\\n";
    document.write(nutxt);

    nutxt = "";
    if ( record["style"] == "article" )
    {
        nutxt = "<i>"+record["journal"]+"</i> <b>"+record["volume"]+"</b>, "+record["pages"]+" ("+record["year"].toString()+")";
        bibtex += "    journal = {"+record["journal"]+"},\\n";
        bibtex += "    volume = {"+record["volume"]+"},\\n";
    }
    else if ( record["style"] == "inbook" )
    {
        nutxt = "in <i>"+record["booktitle"]+"</i>, ";
        bibtex += "    booktitle = {"+record["booktitle"]+"},\\n";
        
        if ( record["series"] !== undefined )
        {
            nutxt += record["series"];
            bibtex += "    series = {"+record["series"]+"},\\n";
            if ( record["number"] !== undefined )
            {
                nutxt += " No. " + record["number"];
                bibtex += "    number = {"+record["number"]+"},\\n";
            }
            nutxt += ", ";
        }
        nutxt += " edited by " + getpeople( record["editor"] );
        bibtex += "    editor = {"+record["editor"]+"},\\n";
        nutxt += " ("+record["publisher"]+", "+record["year"]+") Chap. "+record["chapter"];
        bibtex += "    publisher = {"+record["publisher"]+"},\\n";
        bibtex += "    chapter = {"+record["chapter"]+"},\\n";
        nutxt += ", pp. "+record["pages"];
    }
    bibtex += "    pages = {"+record["pages"]+"},\\n";
    bibtex += "    year = {"+record["year"]+"},\\n";
    document.write(nutxt);
    
    // check for notes.
    if ( record["note"] !== undefined )
    {
        document.write(": "+record["note"]+".");
        var note = record["note"];
        bibtex += "    note = {"+note+"},\\n";
    }
    else
    {
        document.write(".");
    }
    
    // get rid of editor's suggestion for bibtex
    bibtex = bibtex.replace(/<b>editors' suggestion<\/b>; /g, "");
    bibtex = bibtex.replace(/<b>editors' suggestion<\/b>/g, "");
    // get rid of empty notes...
    bibtex = bibtex.replace(/note = {},/g, "");
    // escape all apostrophes
    bibtex = bibtex.replace(/'/g, "\\'");
    // change some html to bibtex
    // bold
    bibtex = bibtex.replace(/<b>/g, "{\\\\bf ");
    bibtex = bibtex.replace(/<\/b>/g, "}");
    // italic
    bibtex = bibtex.replace(/<i>/g, "{\\\\em ");
    bibtex = bibtex.replace(/<\/i>/g, "}");
    // superscript
    bibtex = bibtex.replace(/<sup>/g, "$^{");
    bibtex = bibtex.replace(/<\/sup>/g, "}$");
    // subscript
    bibtex = bibtex.replace(/<sub>/g, "$_{");
    bibtex = bibtex.replace(/<\/sub>/g, "}$");

    bibtex += "}";
    document.write(" <button onclick=\"alert(\'"+bibtex+"\');\">bibtex</a>");

    document.write("</td></tr></table><p>"+record["description"]+"</p>");
    if ( record["tags"] !== undefined )
    {
        document.write("<p class=tags>tags: "+record["tags"]+"</p>");
    }
    document.write("</li>");


};


function writeornotpub( record, recordnumber ) {
    //document.write("<p> record number = "+recordnumber + "</p>");
    if ( recordnumber < pubsMIN )
        pubsBEFORE = true;
    else if ( recordnumber > pubsMAX )
        pubsAFTER = true;
    else
    {
        writepub( record, recordnumber );
        pubsDISPLAYED += 1;
    }
};


