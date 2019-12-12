var apigClient = apigClientFactory.newClient();
var user_id;

function login(username,password){

  let login_body = {
    "messages": [
      {
        "request_type": "log_in",
        "unconstructed": {
          "log_in": {
            "user_id": username,
            "password": password
          }
        }
      }
    ]
  }

  apigClient.logSignPost({},login_body, {}).then(function(result){
      console.log('success')
      let res = result['data']['body']['txt']
      console.log(res)

      if(res== 'passed'){
        user_id = username;
        location.href = '../home/home.html' + '?user_key=' + username;
      }


    }).catch( function(result){
        console.log('fail')
    });
}
    
function Signup(){
  let signup_body = {
  "messages": [
    {
      "request_type": "sign_up",
      "unconstructed": {
        "sign_up": {
          "user_id": document.getElementById("signupUN").value,
          "password": document.getElementById("signupPassword").value,
          "bio": " Input your bio here!",
          "first_name": "FN",
          "last_name": "LN",
          "birthday": "1/1/1990",
          "Email": document.getElementById("signupEmail").value,
          "phone": "555-555-5555"
        },
          
        }
      }
    ]
  }

  console.log(signup_body)

  if (document.getElementById("signupPassword2").value == document.getElementById("signupPassword").value){
  
     apigClient.logSignPost({},signup_body, {}).then(function(result){
      let res = result['data']['body']['txt']

      console.log(res, result)

      if(res== 'account created'){
        location.href = '../login/signup_thanks.html' ;
      }

    });

  }

 



}