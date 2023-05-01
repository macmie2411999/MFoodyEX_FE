export class Brand  {
    constructor(nameBrand, imageBrand, titleBrand, discriptionBrand){
        this.nameBrand = nameBrand;
        this.imageBrand = imageBrand;
        this.titleBrand = titleBrand;
        this.discriptionBrand = discriptionBrand;
    }
    
    showInfor(){
        console.log('nameBrand: ',this.nameBrand);
        console.log('imageBrand: ', this.imageBrand);
        console.log('titleBrand: ', this.titleBrand);
        console.log('discriptionBrand: ', this.discriptionBrand);
    }
}