/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/jqueryui.d.ts" />
/// <reference path="facebook.ts" />

/* 
<tr><th>Title</th><th>Artist</th><th>Key</th></tr>
*/


$(document).ready(function() {
    console.log('list time');
    var list: SetList = new SetList("Untitled List");
    list.addItem(new ListItem('Placeholder', 'Mr. Example', 'Am'));
    list.addItem(new ListItem('Placeholder 2', 'Mr. Tester', 'G'));
    $('#set-list').sortable({ axis: "y" });
    $('#btnAddItem').click(function() {
        $('#addItemModal').modal('show');
    });

    $('#isong, #ikey').keypress(function() {
        if($('#isong').val() != '' && $('#ikey').val() != '') {
            $('#btn-add').removeAttr('disabled');
        }
        else {
            $('#btn-add').attr('disabled', 'disabled');
        }
    });

    $('#btn-add').click(function() {
        list.addItem(new ListItem($('#isong').val(), '[artist will be found]', $('#ikey').val()));
        $('#isong, #ikey').val('');
        $('#addItemModal').modal('hide');
    });
});

function searchSpotify(query: string): void {
    var str: string = '' + encodeURIComponent(query);

    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: str,
            type: 'track'
        },
        success: function (response) {
            console.log(response);
            response.tracks.items.forEach(function(a: any) {
                console.log(a);
            });
        }
    });
}

class SetList {
    private name: string;
    private items: Array<ListItem>;

    public constructor(name: string) {
        this.setName(name);
        this.items = [];
    }

    public addItem(item: ListItem): void {
        this.items.push(item);
        this.updateItemCount();
    }

    public removeItem(item: ListItem): void {
        if(this.items.indexOf(item) >= 0 && this.items.indexOf(item) < this.items.length) {
            this.items.splice(this.items.indexOf(item), 1);
        }
        this.updateItemCount();
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

    public updateItemCount(): void {
        $('#set-list').html('');
        for(var i: number = 0; i < this.items.length; i++) {
            $('#set-list').append('<li><table width="100%"><tr><td>' + this.itemAt(i).getTitle() +
            '</td><td>' + this.itemAt(i).getArtist() + '</td><td class="key">' + this.itemAt(i).getKey() +
            '</td></td><td class="controls"><button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-wrench"></span></button></td></table></li>');
        }
        $('#item-count').text('Items: ' + this.items.length);
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
