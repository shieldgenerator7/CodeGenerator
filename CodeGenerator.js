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
            generated = generated.replace("#"+j+"#", vars[j].trim());
        }
        output += generated+"\n\n";
    }
    let txtOutput = $("output");
    txtOutput.value = output;
    txtOutput.select();
    // txtOutput.setSelectionRange(0,99999);
    document.execCommand("copy");
}
