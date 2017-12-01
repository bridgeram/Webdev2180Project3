$(document).ready(function(){

    // check current php session on start
    $.ajax({
        url: "getsession.php",
        success: function(data){
            var session = JSON.parse(data);

            if(session.hasOwnProperty("logged_in") && session.logged_in == true){
                if(session.hasOwnProperty("user")){
                    login(session.user);
                    return;
                }
            }

            loadLoginPage();
        }
    });

    // load login page
    function loadLoginPage(){
        $.ajax({
            url: "login.html",
            success: function(page){

                $("body").html(page);
                // login page
                $("#loginForm").submit(function(e) {
                    $.ajax({
                        type: "GET",
                        url: "login.php",
                        data: { username: $('#username').val(), 
                            pass: $('#pass').val(),
                        },
                        success: function(data){
                            console.log(data);
                            //login(data);
                        }
                    });
                    e.preventDefault(); // avoid to execute the actual submit of the form.
                });
            }
        });
    }

    function login(result){
        // check result for success
        if(result.result == "not_found"){
            console.log(result);
            $("#message").html("User does not exist");
        } else if (result.result == "password_mismatch"){
            $("#message").html("Incorrect username or password");
        } else if (result.result == "success"){
            //determine the user type
            if(result.type == "admin"){
                console.log(result.type);
                $.ajax({
                    url: "admin.html",
                    success: function(page){
                        loadAdminPage(result, page);
                    }
                });
            } else if (result.type == "user"){
                loadUser(result);
            }
        }
    }

    function loadAdminPage(admin, page){
        $("body").html(page);
        $("#name").html(admin.fname + " " + admin.lname);

        // logout
        $("#logout").click(function(){
            logOut();
        });


        $("#registrationForm").submit(function(e){
            $.ajax({
                type: "GET",
                url: "register.php",
                data: { firstname: $('#firstname').val(),
                    lastname: $('#lastname').val(),
                    username: $('#username').val(), 
                    pass: $('#pass').val(),
                    cpass: $('#cpass').val(),
                },
                success: function(data){
                    console.log(data);
                    // respond to errors
                    if(data == "password_mismatch"){
                        $("#error").html("Passwords must match.");
                    } else if (data == "name_taken"){
                        $("#error").html("Sorry, this username is already taken.");
                    } else if (data == "failed"){
                        $("#error").html("Something went wrong, but we're not sure what.");
                    } else if (data == "success"){
                        $("#error").html("Successfully registered.");
                    }
                }
            });
            e.preventDefault();
        });
        
    }
    
    function loadUser(user){
        $.ajax({
            url: "user.html",
            success: function(page){
                loadUserPage(user, page);
            }
        });
    }
    
    function loadUserPage(user,page){
        $("body").html(page);
        $("#name").html(user.fname + " " + user.lname);

        // logout
        $("#logout").click(function(){
            logOut();
        });

        var users;
        // get users list
        $.ajax({
            url: "getusers.php",
            success: function(data){
                users = (data);
                // get messages
                getMessages(user, users);
            }
        });

        $("#compose").click(function(){
            newMessage(user, users);
        });
        
    }
    
    function newMessage(user, users){
        $.ajax({
            url: "newmessage.html",
            success: function(page){
                $("body").html(page);
                 //console.log(users);
                 //console.log(users);
                for(var i in users){
                    var c_user = users[i];
                    //console.log(c_user[i]);
                    if( c_user.username != user.username || c_user.username != "admin" ){
                        $("#recipients").append("<option>"+c_user.username+", "+c_user.firstname+" "+c_user.lastname+"</option>");
                    }
                }

                $("#cancel").click(function(){
                    loadUser(user);
                });

                //$("#sender").val(users.username);

                $("#newMessageForm").submit(function(e){
                    console.log(user.username);
                    sendMessage(this, user);
                    e.preventDefault();
                });
            }
        });
    }
    
    function sendMessage(form, user){
        $.ajax({
            type: "GET",
            url: "newmessage.php",
            data: { sender: user.username,
                recipients: $('#recipients').val(),
                subject: $('#subject').val(),
                body: $('#body').val(),
            },
            success: function(data){
                console.log(data);
                if(data == "success"){
                    loadUser(user);
                    alert("Message sent!");
                }else if(data=="Cant_admin"){
                    alert("Not authorize to send to Admin. Rest of messages cancel!");
                }else if(data== "User_notfound"){
                    alert("User not found. Rest of messages cancel!");
                }else {
                    alert("Message not sent.");
                }
            }
        });
    }
    
    function getMessages(user, users){
        // get messaged
        $.ajax({
            type: "GET",
            url: "getmessages.php",
            data: { id: user.username, 
            subject: "all" },
            success: function(data){
                console.log("get messages conected");
                console.log(data);
                $("#msglst").html(data);
                $(".messages").each(function(){
                $(this).click(function(){
                    var msg = $(this).attr("id");
                        showMessage(msg, user);
                        markAsRead(msg, user);
                    });
                });
            }
        });
        
    }
    
    function showMessage(msg, user){
        $.ajax({
            type: "GET",
            url: "getmessages.php",
            data: { id: user.username, 
            subject: msg },
            success: function(data){
                console.log("show messages conected");
                console.log(data);
                $("#msglst").html(data);
                $("#return").click(function(){
                    loadUser(user);
                });
            }
        });
    }
    
    function markAsRead(msg, user){
        $.ajax({
            type: "GET",
            url: "markasread.php",
            data: { 
                    message_id: msg,
                    reader_id: user.username
            },
            success: function(data){
                // nothing to do
            }
        });
    }
    
    
    function logOut(){
        if(confirm("Are you sure you want to log out?")){
            $.ajax({
                url: "logout.php",
                success: function(data){
                    loadLoginPage();
                }
            });
        }
    }
    
});//on page load ends here



