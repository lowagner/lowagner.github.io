// GLOBAL parameters YOU CAN SET
var codesMAXpp = 4; // max number of codelications to display per page
var codesSHOWbackTOtopAFTER = 3;  // after X codelications, show the back to top link.  this should NOT be greater than or equal to codesMAXpp.

// SET INTERNALLY IN THE CODE
var codesDISPLAYED = 0; // number of codes displayed
var codesMIN = 0; // index of which record (of the records filtered) to start displaying
var codesMAX = 0; // index of which record is last to display.
var codesBEFORE = false; // if there were any codelications before codesMIN
var codesAFTER = false; // if there were any codelications after codesMAX

if ( codesSHOWbackTOtopAFTER >= codesMAXpp )
    codesSHOWbackTOtopAFTER = codesMAXpp-1;

function writecode( record, recordnumber ) {
    var nutxt = record["title"];
    if ( record["url"] !== undefined )
    {
        nutxt = "<a href='" + record["url"] + "' target='"+nutxt+"'>" + nutxt+"</a>";
    }
    else
    {
        nutxt += " <span style='font-weight:normal'>(unreleased)</span>";
    }
    document.write('<li><table><tr><td class=mainentrytitle>'+nutxt+'</td>');

    nutxt = record["yearstart"];
    if ( record["yearend"] !== undefined && record["yearend"] !== record["yearstart"] )
    {
        nutxt += "-" + record["yearend"];
    }
    document.write('<td class=mainentrydate>'+nutxt+'</td></tr></table>');
    
    document.write("<p>"+record["description"]+"</p>");
    if ( record["tags"] !== undefined )
    {
        document.write("<p class=tags>tags: "+record["tags"]+"</p>");
    }
    document.write("</li>");

};

function writeornotcode( record, recordnumber ) {
    //document.write("<p> record number = "+recordnumber + "</p>");
    if ( recordnumber < codesMIN )
        codesBEFORE = true;
    else if ( recordnumber > codesMAX )
        codesAFTER = true;
    else
    {
        writecode( record, recordnumber );
        codesDISPLAYED += 1;
    }
};


