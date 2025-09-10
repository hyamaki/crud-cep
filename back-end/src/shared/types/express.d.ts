declare namespace Express {
  export interface Request {
    auth_user: string | JwtPayload | undefined; // Add custom property to Express Request
  }
}
