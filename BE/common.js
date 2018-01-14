var send = require('gmail-send')(
    {
        user    : 'water.supervisor.notifier@gmail.com',
        pass    : 'proiect_2018',
        from    : 'Isi Project',
});

module.exports = {
    send_notification : function(to, subject, text) {
        send( {
        to      : to, 
        subject : subject,
        text: text}, 
            function (err, res) 
            {
                if(err)
                {
                    console.log('Error occured');
                    console.log(err.message);
                    return;
                }
                else
                {
                    console.log(res);
                    console.log('Message sent successfully!');
                }
            });
    }
}