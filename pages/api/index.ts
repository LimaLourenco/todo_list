import { NextApiRequest, NextApiResponse } from "next";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    response.status(200).json({message: "Olá Mundo!!"})
}

// Parei em 10:30