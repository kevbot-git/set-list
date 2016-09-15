/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/jqueryui.d.ts" />
/// <reference path="facebook.ts" />
$(document).ready(function () {
    console.log('list time');
    var list = new SetList("Untitled List");
    $('#set-list').sortable({ axis: "y" });
    $('#btnAddItem').click(function () {
        $('#addItemModal').modal('show');
    });
    $('#btn-add').click(function () {
        //list.addItem(new ListItem($('#isong').val(), '[artist will be found]', $('#ikey').val()));
        searchSpotify($('#isong').val(), $('#ikey').val(), list);
        $('#isong, #ikey').val('');
        $('#addItemModal').modal('hide');
    });
});
function searchSpotify(query, key, list) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'track'
        },
        success: function (response) {
            //console.log(response);
            // response.tracks.items.forEach(function(a: any) {
            //     console.log(a.name + ' ' + a.artists[0].name);
            // });
            list.addItem(ListItem.fromSpotify(response.tracks.items[0], key));
        }
    });
}
var SetList = (function () {
    function SetList(name) {
        this.setName(name);
        this.items = [];
    }
    SetList.prototype.addItem = function (item) {
        this.items.push(item);
        this.updateItemCount();
    };
    SetList.prototype.removeItem = function (item) {
        if (this.items.indexOf(item) >= 0 && this.items.indexOf(item) < this.items.length) {
            this.items.splice(this.items.indexOf(item), 1);
        }
        this.updateItemCount();
    };
    SetList.prototype.itemAt = function (index) {
        if (index < this.nItems())
            return this.items[index];
        else {
            console.log('No item at index ' + index);
            return null;
        }
    };
    SetList.prototype.nItems = function () {
        return this.items.length;
    };
    SetList.prototype.setName = function (name) {
        this.name = name;
    };
    SetList.prototype.updateItemCount = function () {
        $('#set-list').html('');
        for (var i = 0; i < this.items.length; i++) {
            $('#set-list').append('<li><table width="100%"><tr><td>' + this.itemAt(i).getTitle() +
                '</td><td>' + this.itemAt(i).getArtist() + '</td><td class="key">' + this.itemAt(i).getKey() +
                '</td></td><td class="controls"><button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-wrench"></span></button></td></table></li>');
        }
        $('#item-count').text('Items: ' + this.items.length);
    };
    return SetList;
}());
var ListItem = (function () {
    function ListItem(title, artist, key) {
        this.title = title;
        this.artist = artist;
        this.setKey(key);
    }
    ListItem.fromSpotify = function (obj, key) {
        return new ListItem(obj.name, obj.artists[0].name, key);
    };
    ListItem.prototype.setKey = function (key) {
        this.key = key;
    };
    ListItem.prototype.getTitle = function () {
        return this.title;
    };
    ListItem.prototype.getArtist = function () {
        return this.artist;
    };
    ListItem.prototype.getKey = function () {
        return this.key;
    };
    return ListItem;
}());
