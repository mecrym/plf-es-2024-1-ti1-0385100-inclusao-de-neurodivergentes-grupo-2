//import { createClient } from '../../../node_modules/pexels';

export class SelectImage {
    
    constructor() {
        this.key = 'Lt9am0k6ijWEDjgVOyxWsfjNV06AAdZ91lhqOM1yh5IwNgxgpyaDENqu';
        this.query = 'Gym';
    }
    async getPhotos(){ 
        fetch(`https://api.pexels.com/v1/search?query=${this.query}`,{
            headers: {
              Authorization: this.key
            }
          })
             .then(resp => {
               return resp.json()
             })
             .then(data => {
               console.log(data)
             })
    }
    async getPhoto(pos){
        fetch(`https://api.pexels.com/v1/search?query=${this.query}`,{
            headers: {
              Authorization: this.key
            }
          })
          .then(resp => resp.json()) // Converte a resposta para JSON
          .then(data => {
            if (data.photos && data.photos.length > 0) {
              const photoUrl = data.photos[pos].src.original;
              console.log("URL:", photoUrl);
            } else {
              console.log("This photo doesn't have a url");
            }
          })
          .catch(error => {
            console.error("Error to fetch pexels:", error);
          });
    }

}
