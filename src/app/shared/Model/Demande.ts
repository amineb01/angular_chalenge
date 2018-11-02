export class Demande {
    constructor(public id: number, public date_debut: Date, public date_fin: Date, public raison: string,
         public status?: boolean, public created_at?: Date, public user_id?: number,public username?: string ) { }
}