var statusIcon = document.getElementById("statusIcon");
var discordContent = document.getElementById("discordContent");

const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

var api = {};
var received = false;

lanyard.onopen = function () {
    lanyard.send(
        JSON.stringify({
        op: 2,
        d: {
            subscribe_to_id: "852584227999318036",
        },
        })
    );
};

setInterval(() => {
    if (received) {
        lanyard.send(
            JSON.stringify({
                op: 3,
            })
        );
    }
}, 30000);

lanyard.onmessage = function (event) {
    received = true;
    api = JSON.parse(event.data);

    if (api.t === "INIT_STATE" || api.t === "PRESENCE_UPDATE") {
        update_presence();
    }
};

function update_presence() {
    if (statusIcon != null) {
        update_status(api.d.discord_status);
    }

    var id = `${api.d.discord_user.id.split("(")[0]}`;
    var pp = `${api.d.discord_user.avatar.split("(")[0]}`;
    var link = "https://cdn.discordapp.com/avatars/" + id + "/" + pp + ".png?size=4096";
    $('img').attr('src', link);
}