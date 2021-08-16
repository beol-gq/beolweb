var config = {
    apiKey: "AIzaSyDqRx5NGq7WqSNviytOnGg-_8QYRLqXYBw",
    authDomain: "jshsus-6144b.firebaseapp.com",
    databaseURL: "https://jshsus-6144b.firebaseio.com",
    projectId: "jshsus-6144b",
    storageBucket: "jshsus-6144b.appspot.com",
    messagingSenderId: "709620057314"
};
firebase.initializeApp(config);

function login1() {
    var id = document.getElementById("logId").value;
    var pw = document.getElementById("logPw").value;

    var emailCheckRegex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (emailCheckRegex.test(id)) {
        login2(id, pw);
    } else {
        firebase.database().ref('USER/ID/'+id+'/email').once('value', function(e) { login2(e.val(), pw) });
    }
}

var loginstate = false;

$('#afterLogin').hide()
$('#afterLogin-1').hide()

function login2(e, p) {
    loginstate = false;
    firebase.auth().signInWithEmailAndPassword(e, p)
        .then(function(informaion) {
            var loginstate = true;
            console.log(informaion.user.email);
            var a = informaion.user.email;
            firebase.database().ref('USER/EMAIL/'+a.replace(/\./gi, '%')).once('value', function(e) {
                console.log(e.val().name);
                var b = e.val();
                firebase.database().ref('USER/'+String(b.gisu)+'/'+encodeURI(b.name)).once('value', function(ee) {
                    var d = ee.val();
                    console.log(String(d.nick));
                    var name = String(d.nick);
                    const p01 = document.getElementById('accountBtn');
                    p01.innerHTML = name;
                    const p02 = document.getElementById('welcome');
                    p02.innerHTML = name + '님 환영합니다!';
                    $('#afterLogin').show();
                    $('#afterLogin-1').show();
                    $('accountBtn').show();
                })
            } )
            console.log(loginstate);
            $('#beforeLogin').hide();
            $('#beforeLogin-1').hide();
        })
        .catch(function(error) {
            var loginstate = false;
            console.log(error.code);
            if (error.code == "auth/invalid-email") {
                alert('무효한 이메일주소 입니다.');
            } else if (error.code == "auth/user-not-found") {
                alert('등록되지 않은 사용자 입니다.');
            } else if (error.code == "auth/too-many-requests") {
                alert('잠시 후 다시 시도하세요.');
            } else if (error.code == "auth/wrong-password") {
                alert('아이디 또는 비밀번호가 맞지 않습니다.');
            } else if (error.code == "auth/argument-error") {
                alert('아이디 또는 비밀번호가 맞지 않습니다.')
            }
        })
}

$('#logPw').keypress(function (e) {
    if (e.keyCode == 13) {
        $('#loginBtn').click();
    }
});
$('#logId').keypress(function (e) {
    if (e.keyCode == 13) {
        $('#loginBtn').click();
    }
});
