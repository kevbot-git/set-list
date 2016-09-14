/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/jqueryui.d.ts" />
/// <reference path="facebook.ts" />
$(document).ready(function () {
    console.log('list time');
    var list = new SetList("Untitled List");
    list.addItem(new ListItem('Hello', 'Mr. Worldwide', 'Am'));
    list.addItem(new ListItem('Test', 'Mr. Tester', 'G'));
    $('#sortable').sortable();
    $('#btnAddItem').click(function () {
        $('#addItemModal').modal('show');
    });
    for (var i = 0; i < list.nItems(); i++) {
        console.log(list.itemAt(i));
        $('#sortable').append('<li>' + list.itemAt(i).getTitle() + '</li>');
    }
});
var SetList = (function () {
    function SetList(name) {
        this.setName(name);
        this.items = [];
    }
    SetList.prototype.addItem = function (item) {
        this.items.push(item);
    };
    SetList.prototype.removeItem = function (item) {
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
    return SetList;
}());
var ListItem = (function () {
    function ListItem(title, artist, key) {
        this.title = title;
        this.artist = artist;
        this.setKey(key);
    }
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
