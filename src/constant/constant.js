export const optionsOfCookie = {
    httpOnly:true,
    maxAge: 86400000,
    // secure: process.env.NODE_ENV === "production" ? true : false,
    // secure:true,
    sameSite:"none",
    path:"/",
}
