
// the following code is gratefully obtained from:
// http://stackoverflow.com/questions/979975/how-to-get-the-value-from-url-parameter

var QueryString = function () {
// This function is anonymous, is executed immediately and 
// the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    if ( query.length > 0 )
    {
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1].replace(/%20/g, " ");
            // If second entry with this name, make an array
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]], pair[1].replace(/%20/g, " ") ];
                query_string[pair[0]] = arr;
            // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1].replace(/%20/g, " "));
            }
        } 
    }
    return query_string;
} ();


var everythingButS = function () {
    var string = "?";

    for ( var key in QueryString ) 
    {
        if ( key !== "s" && QueryString[key] !== undefined )
        {
            string += key+"="+QueryString[key]+"&";
        }
    } 

    return string.trim();
} ();


function writenavtable( s, left, center, right ) {
    document.write("<table id=navigation><tr>");
    if ( left )
        document.write("<td width=\"120px\"><span><a href=\""+left+"s="+(s-1)+"\">Previous</a></span></td>");
    else
        document.write("<td width=\"120px\"></td>"); 

    if ( center || s == "all" )
        document.write("<td width=\"150px\" align=\"center\"><span><a href=\"#top\">Back to top</a><span></td>");
    else
        document.write("<td width=\"150px\" align=\"center\"></td>");

    if ( right )
        document.write("<td width=\"120px\" align=\"right\"><span><a href=\""+right+"s="+(s+1)+"\">Next</a></span></td>");
    else
        document.write("<td width=\"120px\"></td>");
    document.write("</tr></table>");

};


