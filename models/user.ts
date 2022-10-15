
type User = {
    ID: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: number;
    Address: string;
    Bvn: number;
    IsAdmin: boolean
    CreatedAt: Date;
    UpdatedAt: Date;
};

export default User;