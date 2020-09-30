let questions_xpath = '//tbody[@class="reactable-data"]/tr';


function xpath(xpathToExecute){
    var result = [];
    var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ){
        result.push( nodesSnapshot.snapshotItem(i) );
    }
    return result;
}



// function to remove the locked questions returns {total: 10, remaining: 6, removed: 4}
function remove_locked_questions(path=questions_xpath){
    //collecting every questions from table
    let rows = xpath(path);
    let total = rows.length

    //removing locked questions from table
    for (let row of rows){
        if (row.getElementsByClassName("fa fa-lock").length>1){
            row.remove();
        }
    }
    
    //getting number of remaining questions
    let remaining_questions = xpath(path).length
    return {total: total, remaining: remaining_questions, removed: total-remaining_questions}
}


// function to remove the locked questions returns {total: 10, remaining: 4, removed: 6}
function remove_unlocked_questions(path = questions_xpath){
    //collecting every questions from table
    let rows = xpath(path);
    let total = rows.length

    //removing unlocked questions from table
    for (let row of rows){
        if (row.getElementsByClassName("fa fa-lock").length<=1){
            row.remove();
        }
    }
    
    //getting number of remaining questions
    let remaining_questions = xpath(path).length
    return {total: total, remaining: remaining_questions, removed: total-remaining_questions}
}


function hide_locked_questions(path=questions_xpath, boolean=true){
    //collecting every questions from table
    let rows = xpath(path);
    let total = rows.length
    let remaining_questions = total

    //removing locked questions from table
    for (let row of rows){
        if (row.getElementsByClassName("fa fa-lock").length>1 && boolean){
            row.style.display = "none";
            remaining_questions--;
        }
        else{
            row.style.display = "";
            remaining_questions--;
        
        }
    }
    
    //getting number of remaining questions
    return {total: total, remaining: remaining_questions, removed: total-remaining_questions}
}

function hide_unlocked_questions(path=questions_xpath, boolean=true){
    //collecting every questions from table
    let rows = xpath(path);
    let total = rows.length
    let remaining_questions = total

    //removing locked questions from table
    for (let row of rows){
        if (row.getElementsByClassName("fa fa-lock").length<=1 && boolean){
            row.style.display = "none";
            remaining_questions--;
        }
        else{
            row.style.display = "";
            remaining_questions--;
        }
    }
    
    //getting number of remaining questions
    return {total: total, remaining: remaining_questions, removed: total-remaining_questions}
}