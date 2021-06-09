namespace UsersModel {
    export interface registerUser {
        email: string,
        password: string,
        firstname: string,
        lastname: string,
        adress?: string,
        city?: string,
        country?: string,
        datebirth?: string,
        phone?: string,
        profilepic?: string
    }

    export interface loginUser {
        email: string,
        password: string
    }
}