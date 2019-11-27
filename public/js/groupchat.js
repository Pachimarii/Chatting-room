
$(document).ready(function(){
    var socket = io();
    var room = $('#groupName').val();
    var sender = $('#sender').val();

    socket.on('connect', function() {
        console.log('Yikes, user on NEW connection.');

        var params = {
            room: room,
            name: sender
        };
        socket.emit('join',params, function(){
            console.log('User has joined this chanel.')
        });
    });

    socket.on('usersList', function(users){
        var ol = $('<ol></ol>');

        for(var i=0; i<users.length; i++){
            ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">'+users[i]+'</a></p>');
        }

        $(document).on('click', '#val', function(){
            $('#name').text('@'+$(this).text());
            $('#receiverName').val($(this).text());
            $('#nameLink').attr("href", "/profile/"+$(this).text());
        });
        

        $('#numValue').text('('+users.length+')');
        $('#users').html(ol);
    })

    socket.on('newMessage', function(data){
        // console.log(data.text);
        // console.log(data.room);
        console.log(data);
        $('#msg').val('');
        let temp = `<li class="left">
        <span class="chat-img1 pull-left">
            <img src="https://placehold.it/300x300" class="img-circle" alt="">
        </span>
        <div class="chat-body1">
            <span class="chat-name">${data.from}</span>
            <br>
            ${data.text}
        </div>
     </li>`;
     $("#messages").append(temp);
    })



    $('#message-form').on('submit', (e)=>{
        e.preventDefault();
        var msg = $('#msg').val();
        socket.emit('createMessage', {
            text: msg,
            room: room,
            from: sender
        })
    });

});