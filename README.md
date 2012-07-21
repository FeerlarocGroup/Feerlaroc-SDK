<h1>feerlaroc.js</h1>

<h2>Getting Started</h2>

<em>Login</em>

<code>
 function exec(){
        //read the text boxes
        var m_username = $('#username').val();
        var m_password = $('#password').val();
        //syncronise with the server and check whether it is running
        if(feerlaroc.sync() == "running"){
                //if it is running signin
                feerlaroc.login("","","",m_username,m_password);
                alert(feerlaroc.AOUTH_STATE);
        }else{
                alert("The server is down");
        }
}
</code> 

<em>Signup</em>

<code>
function exec(){
        //read the text boxes
        var m_name = $('#name').val();
        var m_surname = $('#surname').val();
        var m_number = $('#cellNo').val();
        var m_username = $('#username').val();
        var m_password = $('#password').val();
        //syncronise with the server and check whether it is running
        if(feerlaroc.SERVER_STATE == "running"){
        //if it is running signin
                feerlaroc.signup(m_name,m_surname,m_number,m_username,m_password);
                alert(feerlaroc.AOUTH_STATE);
        }else{
                alert("The server is down");
        }
}
</code>

<em>Trade</em>

<code>
function exec(){
         //check whether the server is running
        if(feerlaroc.SERVER_STATE == "running"){
                //if it is running check whether the user is signed in or signup
                if((feerlaroc.AOUTH_STATE == "signedin")||(feerlaroc.AOUTH_STATE == "signedup")){
                        //read the text boxes
                        var m_number = $('#cellNo').val();
                        var m_amount = $('#amount').val();
                        //sell airtime
                         feerlaroc.trade(m_number,m_amount);
                        alert(feerlaroc.AOUTH_STATE);
                }
        }else{
                        alert("The server is down");
        }
}
</code>
