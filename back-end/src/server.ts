import app from "./app";


const PORT = process.env.PORT || 4000;


export const server = app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
});

export default app;
