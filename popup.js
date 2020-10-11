chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: `let questions_xpath = '//tbody[@class="reactable-data"]/tr';


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
        
            // determinent for the question if it's unlocked
            let url = window.location.href.match(new RegExp('leetcode\.com\/tag'))
            let det = (url!==null)? 1:2
        
            //removing locked questions from table
            for (let row of rows){
                if (row.getElementsByClassName("fa fa-lock").length>=det){
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
        
            // determinent for the question if it's unlocked
            let url = window.location.href.match(new RegExp('leetcode\.com\/tag'))
            let det = (url!==null)? 1:2
        
            //removing unlocked questions from table
            for (let row of rows){
                if (row.getElementsByClassName("fa fa-lock").length<det){
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
        
            // determinent for the question if it's unlocked
            let url = window.location.href.match(new RegExp('leetcode\.com\/tag'))
            let det = (url!==null)? 1:2
        
            //removing locked questions from table
            for (let row of rows){
                if (row.getElementsByClassName("fa fa-lock").length>=det && boolean){
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
        
            // determinent for the question if it's unlocked
            let url = window.location.href.match(new RegExp('leetcode\.com\/tag'))
            let det = (url!==null)? 1:2
        
            //removing locked questions from table
            for (let row of rows){
                if (row.getElementsByClassName("fa fa-lock").length<det && boolean){
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
        }`});
});


function execute_script_on_active_tab(code_to_execute="string"){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: code_to_execute});
    });
}


remove_locked = document.getElementById("remove-locked")
remove_unlocked = document.getElementById("remove-unlocked")

remove_locked.onclick = function(ele) {
    execute_script_on_active_tab("remove_locked_questions();")
};
remove_unlocked.onclick = function(ele){
    execute_script_on_active_tab("remove_unlocked_questions();")
};


show_hide_locked = document.getElementById("locked")
show_hide_unlocked = document.getElementById("unlocked")

show_hide_locked.onclick = function(ele){
    status = show_hide_locked.getAttribute("aria-hidden")
    if (status == "false"){
        show_hide_locked.setAttribute("aria-hidden", "true")
        show_hide_locked.querySelector("span").innerText = "Hide"
        execute_script_on_active_tab(`hide_locked_questions()`)
    }
    else{
        show_hide_locked.setAttribute("aria-hidden", "false")
        show_hide_locked.querySelector("span").innerText = "Show"
        execute_script_on_active_tab(`hide_unlocked_questions()`)
    }
}
execute_script_on_active_tab("console.log('loaded extension')")