/**
 * Created by Patric on 24-8-2015.
 */
if (Meteor.isServer) {

    Meteor.startup(function() {
        var em = new EventDDP('telegram');

        TelegramBot.token = '174233667:AAFDzCVGdiGbVoQnkcxs1y2pUAPl24kiSeE';
        TelegramBot.token = '179167589:AAHZA5u4aDjEEyspPFtYtkM8W2OGY6YhZmo';
        TelegramBot.token = '154188981:AAG-q8n--iua6fwzUz8Q1OaQr4ZL6uaUkrA';

        TelegramBot.catchAll = function(data) {
            if(!checkCancel(data)) {
                if(!checkYes(data)) {
                    if(!checkNo(data)) {
                        if(!checkTitle(data)) {
                            if(!checkDescription(data)) {
                                console.log(20000000)
                            } else {
                                console.log(10000000)
                            }
                        }
                    }
                }
            };
            return;
            var kb;
            if(data.message.text === 'cancel') {
                kb = {
                    hide_keyboard: true,
                    selective: false
                };
                kb = JSON.stringify(kb);
                TelegramBot.method('sendMessage', { chat_id: data.message.chat.id, text: 'Cancelled!',
                        reply_markup:kb
                    }
                );
            } else if(data.message.text === 'yes') {
                kb = {
                    hide_keyboard: true,
                    selective: false
                };
                kb = JSON.stringify(kb);
                TelegramBot.method('sendMessage', { chat_id: data.message.chat.id, text: 'Give up the title?',
                        reply_markup:kb
                    }
                );
                if (Kennis.find({'chat.message.chat.id':data.message.chat.id, title: { $exists: false }}).count() === 0) {
                    var kennis = {
                            'chat': data
                        };
                    Kennis.insert(kennis);
                }
            } else {
                kb = {
                    hide_keyboard: true,
                    selective: false
                };
                kb = JSON.stringify(kb);
                TelegramBot.method('sendMessage', { chat_id: data.message.chat.id, text: 'Give up the description?',
                        reply_markup:kb
                    }
                );
            }
            //TelegramBot.method('sendMessage', { chat_id: original.chat.id, text: '',
            //        reply_markup:kb,
            //        parse_mode: 'Markdown'
            //    }
            //);
            em.emit('telegram',{data: data});
        };
        TelegramBot.parsePollResult = function(data) {
            data.map(function (item) {
                TelegramBot.getUpdatesOffset = item.update_id;
                var chatId = item.message.chat.id;
                var from = item.message.from.username;
                if(msg = item.message.text) {
                    msg = TelegramBot.parseCommandString(msg);
                    var obj = _.find(TelegramBot.triggers, function(obj) { return obj.command == msg[0] });
                    if(obj) {
                        TelegramBot.send(obj.callback(msg, from, item.message), chatId);
                    }else {
                        if(typeof(TelegramBot.catchAll) === 'function') {
                            TelegramBot.catchAll(item);
                        }
                    }
                }
                else {
                    if(typeof(TelegramBot.catchAll) === 'function') {
                        TelegramBot.catchAll(item);
                    }
                }
            });
        }
        TelegramBot.start();
        TelegramBot.addListener('/help', function(command) {
            var msg = "I have the following commands loaded:\n";
            TelegramBot.triggers.forEach(function (post) {
                msg = msg + "- " + post.command + "\n"
            });
            return msg
        });
        TelegramBot.addListener('/createKnowledge', function(command, username, original) {
            var kb = {
                keyboard: [
                    ['yes', 'no'],
                    [ 'cancel'],
                ],
                one_time_keyboard: true,
                resize_keyboard: true,
                reply_to_message_id: original.message_id,
                selective: true
            };
            var kb2 = { /*  reply_markup */
                hide_keyboard: true,
                selective: false
            };
            kb = JSON.stringify(kb);
            kb2 = JSON.stringify(kb2);
            TelegramBot.method('sendMessage', { chat_id: original.chat.id, text: 'Do *you* want to create a question?\n',
                    reply_markup:kb,
                    parse_mode: 'Markdown'
                }
            );
            console.log(command, username);
            // command[1] will be the first argument, command[2] the second etc
            // below the bot will reply with 'test: hi' if you sent him /test hi
            //return "test: " + command[1];
            //return s;
        });
        TelegramBot.addListener('/geo', function(command, username, original) {
            TelegramBot.method('sendLocation',{
                chat_id: original.chat.id,
                latitude: 59.329323,
                longitude: 18.068581
            })
        });

        if (Kennis.find().count() === 0) {
            var kennis = [
                {
                    'title': 'Malcom X',
                    'description': 'Zwarte vrijheidsstrijder in Amerika'
                },
                {
                    'title': 'All dubstep all the time',
                    'description': 'Get it on!'},
                {
                    'title': 'Savage lounging',
                    'description': 'Leisure suit required. And only fiercest manners.'}
            ];
            for (var i = 0; i < kennis.length; i++) {
                Kennis.insert(kennis[i]);
            }
        }

        function checkCancel(data) {
            var kb;
            if(data.message.text === 'cancel') {
                kb = {
                    hide_keyboard: true,
                    selective: false
                };
                kb = JSON.stringify(kb);
                TelegramBot.method('sendMessage', { chat_id: data.message.chat.id, text: 'Cancelled!',
                        reply_markup:kb
                    }
                );
                return true;
            }
            return false;
        }

        function checkYes(data) {
            var kb;
            var kennis;

            if(data.message.text === 'yes') {
                kennis = {
                    'chat': data,
                    'title': null,
                    'description': null
                };
                kb = {
                    hide_keyboard: true,
                    selective: false
                };
                kb = JSON.stringify(kb);
                if (Kennis.find({'chat.message.chat.id':data.message.chat.id, title: { $exists: false }}).count() === 0) {
                    Kennis.insert(kennis);
                    TelegramBot.method('sendMessage', {
                            chat_id: data.message.chat.id,
                            text: 'Give up the title?',
                            reply_markup: kb
                        }
                    );
                }

                return true;
            }

            return false;
        }

        function checkNo(data) {
            var kb;

            if(data.message.text === 'yes') {
                kb = {
                    hide_keyboard: true,
                    selective: false
                };
                kb = JSON.stringify(kb);
                TelegramBot.method('sendMessage', {
                        chat_id: data.message.chat.id, text: 'No knowledge added!',
                        reply_markup: kb
                    }
                );
                return true;
            }

            return false;
        }

        function checkTitle(data) {
            var kennis = Kennis.findOne({'chat.message.chat.id':data.message.chat.id, title: { $in: [null] }});
            var kb;

            if (typeof kennis !== 'undefined') {
                Kennis.update({'_id': kennis._id}, {title: data.message.text});
                kb = {
                    hide_keyboard: true,
                    selective: false
                };
                TelegramBot.method('sendMessage', {
                        chat_id: data.message.chat.id, text: 'Give up the description please?',
                        reply_markup: kb
                    }
                );
                return true;
            }

            return false;
        }

        function checkDescription(data) {
            var kennis = Kennis.findOne({'chat.message.chat.id':data.message.chat.id, description: { $in: [null] }});
            var kb;

            if (typeof kennis !== 'undefined') {
                Kennis.update({'_id': kennis._id}, {description: data.message.text});
                kb = {
                    hide_keyboard: true,
                    selective: false
                };
                TelegramBot.method('sendMessage', {
                        chat_id: data.message.chat.id, text: 'Knowledge added!',
                        reply_markup: kb
                    }
                );
                return true;
            }

            return false;
        }

    });
}