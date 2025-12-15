export interface User {
    id:          string;
    email:       string;
    name:        string;
    created_at:  Date;
    last_login:  Date | null;
    login_count: number;
}
