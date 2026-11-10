export class Link {
    readonly url: string;
    readonly label: string;
    readonly language: string;
    constructor(url: string, label = "", language = "") {
        new URL(url);
        this.url = url;    
        this.label = label;    
        this.language = language;
    }

    get site(): string {
        return new URL (this.url).hostname.replace(/^www\./, "");
    }
}