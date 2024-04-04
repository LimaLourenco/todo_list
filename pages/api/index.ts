/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    console.log("Aqui", request.headers);
    response.status(200).json({ message: "Olá Mundo!!" }); // Seria o json que sai desta pagina, o conteudo por exemplo. O .json -> retorna o objeto convertido em string.
}

// Lembrando que o response, é como eu mando as informações para o usuário;
// Já o request, é quando o usuário faz a solicitação (request),
// e eu posso olhar no console do browser, e ver as chamadas de apis especificas,
// das solicitações dos usuarios.
