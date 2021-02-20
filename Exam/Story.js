class Story {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
        this.comId = 1;
    }

    get likes() {
        if (this._likes.length <= 0) {
            return `${this.title} has 0 likes`;
        } else if (this._likes.length == 1) {
            return `${this._likes[0]} likes this story!`
        } else {
            return `${this._likes[0]} and ${this._likes.length - 1} others like this story!`
        }
    }

    like(username) {
        if (username == this.creator) {
            throw new Error("You can't like your own story!")
        } else if (this._likes.includes(username)) {
            throw new Error("You can't like the same story twice!")
        } else {
            this._likes.push(username);
            return `${username} liked ${this.title}!`
        }
    }

    dislike(username) {
        if (!this._likes.includes(username)) {
            throw new Error("You can't dislike this story!");
        } else {
            let index = this._likes.findIndex((x) => username == x);
            this._likes.splice(index, 1);
            return `${username} disliked ${this.title}`;
        }
    }

    comment(username, content, id) {
        if (id == undefined) {
            this._comments.push({ id: this.comId, username, content, replies: [] })
            this.comId++;
            return `${username} commented on ${this.title}`;
        } else if (this._comments[id] !== undefined) {
            const index = this._comments.find((x) => x.id == id);
            index.replies.push({ id: `${id}.${index.replies.length + 1}`, username, content });
            return "You replied successfully";
        }
    }

    toString(sortingType) {
        const titleN = `Title: ${this.title}`;
        const cr = `Creator: ${this.creator}`;
        const likesN = `Likes: ${this._likes.length}`;
        const commentN = [`Comments:`];
        if (sortingType == 'asc') {
            this._comments.sort((a, b) => a.id - b.id)
                .forEach(x => {
                    if (x.replies.length == 0) {
                        commentN.push(`-- ${x.id}. ${x.username}: ${x.content}`);
                    } else {
                        commentN.push(`-- ${x.id}. ${x.username}: ${x.content}`);
                        x.replies.sort((a, b) => a.id - b.id).forEach(y => {
                            commentN.push(`--- ${y.id}. ${y.username}: ${y.content}`)
                        });
                    }
                });
            let final = commentN.join('\n');
            return [titleN, cr, likesN, final].join('\n');
        } else if (sortingType == 'desc') {
            this._comments.sort((a, b) => b.id - a.id).forEach(x => {
                if (x.replies.length == 0) {
                    commentN.push(`-- ${x.id}. ${x.username}: ${x.content}`);
                } else {
                    commentN.push(`-- ${x.id}. ${x.username}: ${x.content}`);
                    x.replies.sort((a, b) => b.id - a.id).forEach(y => {
                        commentN.push(`--- ${y.id}. ${y.username}: ${y.content}`)
                    });
                }
            });
            let final = commentN.join('\n');
            return [titleN, cr, likesN, final].join('\n');
        } else if (sortingType == 'username') {
            this._comments.sort((a, b) => a.username.localeCompare(b.username)).forEach(x => {
                if (x.replies.length == 0) {
                    commentN.push(`-- ${x.id}. ${x.username}: ${x.content}`);
                } else {
                    commentN.push(`-- ${x.id}. ${x.username}: ${x.content}`);
                    x.replies.sort((a, b) => a.username.localeCompare(b.username)).forEach(y => {
                        commentN.push(`--- ${y.id}. ${y.username}: ${y.content}`)
                    });
                }
            });
            let final = commentN.join('\n');
            return [titleN, cr, likesN, final].join('\n');
        }
    }
}

let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));
