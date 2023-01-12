class Article {
    id: number;
    title: string;
    content: string;
    price: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;

    public getId(){
        return this.id;
    }
    public getTitle(){
        return this.title;
    }
    public setTitle(title: string):void{
        this.title = title;
    }
    public getContent(){
        return this.content;
    }
    public setContent(content: string): void{
        this.content = content;
    }
    public getPrice(){
        return this.price;
    }
    public setPrice(price: number): void{
        this.price = price;
    }
    public getStatus(){
        return this.status;
    }
    public setStatus(status: number): void{
        this.status = status;
    }
    public getCreatedAt(){
        return this.createdAt;
    }
    public getUpdatedAt(){
        return this.updatedAt;
    }
} 