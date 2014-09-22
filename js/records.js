// GLOBAL parameters YOU CAN SET
var recordsMAXpp = 4; // max number of records to display per page
var recordsSHOWbackTOtopAFTER = 3;  // after X records, show the back to top link.  this should NOT be greater than or equal to recordsMAXpp.

// SET INTERNALLY IN THE CODE
var recordsDISPLAYED = 0; // number of records displayed
var recordsMIN = 0; // index of which record (of the records filtered) to start displaying
var recordsMAX = 0; // index of which record is last to display.
var recordsBEFORE = false; // if there were any records before recordsMIN
var recordsAFTER = false; // if there were any records after recordsMAX

function writerecord( record, recordnumber ) {
    // place holder for other more intense record writing
    document.write('<li>'+record["title"]+"</li>");
};

function writeornotrecord( record, recordnumber ) {
    //document.write("<p> record number = "+recordnumber + "</p>");
    if ( recordnumber < recordsMIN )
        recordsBEFORE = true;
    else if ( recordnumber > recordsMAX )
        recordsAFTER = true;
    else
    {
        writerecord( record, recordnumber );
        recordsDISPLAYED += 1;
    }
};

function writebyfilter( basehtml, data, func ) {
//    // just double checking some stuff here
//    if ( recordsSHOWbackTOtopAFTER >= recordsMAXpp )
//        recordsSHOWbackTOtopAFTER = recordsMAXpp-1;

    // first check if we need to write only a certain page...
    var s = 0;
    if ('s' in QueryString)
    {
        if ( QueryString['s'] == "all" )
        {
            s = "all";
        }
        else
        {
            s = parseInt( QueryString['s'] );
        }
    }

    if ( s == "all" )
    {   
        data( func ).each( writerecord );
        writenavtable( s, null, 1, null );
    }
    else
    {
        recordsMIN = s*recordsMAXpp;
        recordsMAX = (s+1)*recordsMAXpp-1; 
        data( func ).each( writeornotrecord );

        if ( recordsDISPLAYED == 0 )
        {
            document.write("Sorry, no results found with those filters.");
        }
        else if ( recordsDISPLAYED >= recordsSHOWbackTOtopAFTER || recordsBEFORE || recordsAFTER )
        {
            var left = "";
            if (recordsBEFORE) 
                left = basehtml+everythingButS;
            
    
            var center = 0;
            if ( recordsDISPLAYED >= recordsSHOWbackTOtopAFTER )
                center = 1;

            var right = "";
            if (recordsAFTER)
                right = basehtml+everythingButS;
            writenavtable(s, left, center, right);
        }
    }
};


function showfilters( basehtml, filters ) {
    document.write("<ul>");
    for ( var i=0; i<filters.length; i++ ) {
        if ( (filters[i].length == 2) && filters[i][1] == "all" ) {
            document.write("<li><a href=\""+basehtml+everythingButS+"s=all\">all</a></li>");
        } else {
            var writeout = "<li><a href=\""+basehtml+"?";
            var label = "";
            for ( var j=0; j<filters[i].length; j+=2 ) {
                var filter = filters[i][j];
                var value= filters[i][j+1];
                writeout += filter+"="+value;
                label += value;
                if ( j < filters[i].length - 2 ) {
                    writeout += "&";
                    label += ", ";
                }
            }
            writeout += "\">"+label+"</a></li>";
            document.write( writeout );
        }
    }
    document.write("</ul>");
}

function showtags( basehtml, tags ) {
    document.write("<ul>");
    for ( var i=0; i<tags.length; i++ )
    {
        var tag = tags[i];
        document.write( "<li><a href=\""+basehtml+"?g="+tag+"\">"+tag+"</a></li>");
    }
    document.write("</ul>");
}
