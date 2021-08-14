"use strict"

let $ = function(id){
    return document.getElementById(id);
}

let generateCode = function(){
    let output = "";
    let template = $("template").value;
    let inserts = $("inserts").value.split("\n");
    for (let i = 0; i < inserts.length; i++){
        let vars = inserts[i].split(",");
        let generated = template;
        for(let j = 0; j < vars.length; j++){
            generated = generated.replaceAll("#"+j+"#", vars[j].trim());
        }
        output += generated+"\n";
    }
    let txtOutput = $("output");
    txtOutput.value = output;
    txtOutput.select();
    // txtOutput.setSelectionRange(0,99999);
    document.execCommand("copy");
    window.open('mailto:test@example.com?subject="Certificate"&body='+encodeURIComponent(output));
}

let generateEmailButtons = function(){
    let emailText = "";
    let inserts = $("inserts").value.split("\n");
    for (let i = 0; i < inserts.length; i++){
        let vars = inserts[i].split('\t');
        let name = vars[0];
        let email = vars[1];
        if (!name && !email){
            continue;
        }
        name = name || "(Name)";
        email = email || "(Email)";
        emailText += "<br>";
        emailText += "<div class='btn-email' style='border:1px; border-style:solid;'>";
            emailText += "<table>";
                emailText += "<tr>";
                    emailText += "<td>";
                        emailText += "<input type='checkbox' id='chkEmail'>";
                    emailText += "</td>";
                    emailText += "<td>";
                        emailText += name;
                        emailText += "<br>";
                        emailText += email;
                    emailText += "</td>";
                emailText += "</tr>";
            emailText += "</table>";
        emailText += "</div>";
    }
    $("divEmailButtons").innerHTML = emailText;
}

//2019-12-27a: copied from https://stackoverflow.com/a/14822579/2336212
String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};
