import { json } from "@remix-run/react";

export async function loader(){
    return json({
        message: "hi from api"
    });
}