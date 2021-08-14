"use strict"

let $ = function(id){
    return document.getElementById(id);
}

let generateCode = function(){
    let output = "";
    let template = $("template").value;
    template = template.replaceAll("#name#", "#0#");
    let inserts = $("inserts").value.replaceAll("\t",",").split("\n");
    for (let i = 0; i < inserts.length; i++){
        let vars = inserts[i].split(",");
        let generated = template;
        for(let j = 0; j < vars.length; j++){
            generated = generated.replaceAll("#"+j+"#", vars[j].trim());
        }
        output += generated+"\n";
    }
    $("divOutput").innerHTML = 'Output<br>'
        +'<textarea id="output" placeholder="Generated Code" rows="10" cols="50"></textarea>';
    let txtOutput = $("output");
    txtOutput.value = output;
    txtOutput.select();
    // txtOutput.setSelectionRange(0,99999);
    document.execCommand("copy");
}

let generateEmailButtons = function(){
    let emailText = "";
    let inserts = $("inserts").value.split("\n");
    emailText += '<br><input type="text" id="txtSubject" placeholder="Subject"/><br>';
    for (let i = 0; i < inserts.length; i++){
        let vars = inserts[i].split('\t');
        let name = vars[0];
        let email = vars[1];
        if (!name && !email){
            continue;
        }
        name = name || "<span style='color:red'>(Name)</span>";
        email = email || "<span style='color:red'>(Email)</span>";
        emailText += "<div class='btn-email'>";
            emailText += "<table>";
                emailText += "<tr>";
                    emailText += "<td>";
                        emailText += "<input type='checkbox' id='chkEmail"+i+"'>";
                    emailText += "</td>";
                    emailText += "<td onclick='sendEmail("+i+")' width=100%>";
                        emailText += name;
                        emailText += "<br>";
                        emailText += email;
                    emailText += "</td>";
                emailText += "</tr>";
            emailText += "</table>";
        emailText += "</div>";
    }
    $("divOutput").innerHTML = emailText;
}

let sendEmail = function(index){
        let inserts = $("inserts").value.split('\n');
        let template = $("template").value;
        let vars = inserts[index].split('\t');
        let name = vars[0] || "(Name)";
        name = name.trim();
        let email = vars[1] || "(Email)";
        email = email.trim();
        let output = template.replaceAll("#name#", name);
        output = encodeURIComponent(output);
        console.log(output);
        let subject = $("txtSubject").value || "Subject";
        subject = encodeURIComponent(subject.trim());
        window.open('mailto:'+email+'?subject='+subject+'&body='+output);
        $("chkEmail"+index).checked = true;
}

//2019-12-27a: copied from https://stackoverflow.com/a/14822579/2336212
String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};
