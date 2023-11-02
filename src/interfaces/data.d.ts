interface ProductData {
    id?: string,
    barCode: number | null,
    name: string,
    quantity: number,
    expiry: string | string[] | null | undefined,
    supplier?: string,
    referenceName?: string,
    createdAt: Date | null,
}

interface UserAuthData {
    email: string,
    password: string,
}