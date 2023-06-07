export interface IAuthData {
    user: {
        id: number,
        email: string,
        accessToken: string
    } | null
}