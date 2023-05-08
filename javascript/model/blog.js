export class BLOG  {
    constructor(ulrSource, urlImage, titleBlog, contentBlog){
        this.ulrSource = ulrSource;
        this.urlImage = urlImage;
        this.titleBlog = titleBlog;
        this.contentBlog = contentBlog;
    }
    
    showInfor(){
        console.log('Ulr Source: ',this.ulrSource);
        console.log('Url Image: ', this.urlImage);
        console.log('Title Blog: ',this.titleBlog);
        console.log('Content Blog: ', this.contentBlog);
    }
}