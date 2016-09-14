/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/jqueryui.d.ts" />
/// <reference path="facebook.ts" />

$(document).ready(function() {
    console.log('list time');
    var list: SetList = new SetList("Untitled List");
    list.addItem(new ListItem('Hello', 'Mr. Worldwide', 'Am'));
    list.addItem(new ListItem('Test', 'Mr. Tester', 'G'));
    $('#sortable').sortable();
    $('#btnAddItem').click(function() {
        $('#addItemModal').modal('show');
    });
    for(var i: number = 0; i < list.nItems(); i++) {
        console.log(list.itemAt(i));
        $('#sortable').append('<li>' + list.itemAt(i).getTitle() + '</li>');
    }
});

class SetList {
    private name: string;
    private items: Array<ListItem>;

    public constructor(name: string) {
        this.setName(name);
        this.items = [];
    }

    public addItem(item: ListItem): void {
        this.items.push(item);
    }

    public removeItem(item: ListItem): void {
        
    }

    public itemAt(index: number): ListItem {
        if(index < this.nItems())
            return this.items[index];
        else {
            console.log('No item at index ' + index);
            return null;
        }
    }

    public nItems(): number {
        return this.items.length;
    }

    public setName(name: string): void {
        this.name = name;
    }
}

class ListItem {
    private title: string;
    private artist: string;
    private key: string;

    public constructor(title: string, artist: string, key: string) {
        this.title = title;
        this.artist = artist;
        this.setKey(key);
    }

    public setKey(key: string): void {
        this.key = key;
    }

    public getTitle(): string {
        return this.title;
    }
    
    public getArtist(): string {
        return this.artist;
    }

    public getKey(): string {
        return this.key;
    }
}
