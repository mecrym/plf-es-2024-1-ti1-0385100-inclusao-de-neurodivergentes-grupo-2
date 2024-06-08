export class SelectImage{
    constructor() {
        this.urlBase = 'http://localhost:3000/users';
      }
    async getUsers(){
        try{
            const res = await fetch(this.urlBase);
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        }
        
    }
}