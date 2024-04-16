import React from "react";
// import { GlobalStyles } from "../src/ui/theme/GlobalStyles"
import { GlobalStyles } from "@ui/theme/GlobalStyles";

const bg = "./bg.jpg"; // inside public folder

const todos = [
    {
        id: "ca2fdc57-8916-4b74-a39c-5c0ac920707e",
        date: "2024-04-09T12:01:28.744Z",
        content: "Primeira TODO!!!",
        done: false,
    },
    {
        id: "14f5da09-559b-4c3b-abf8-ca8cbdee239d",
        date: "2024-04-09T12:01:28.747Z",
        content: "Terceira TODO com um novo content!",
        done: false,
    },
    {
        id: "6277d0c8-697a-47db-9d8d-cdcea0fe0678",
        date: "2024-04-09T12:01:28.748Z",
        content: "Quarta TODO com um novo content!",
        done: false,
    },
];

function HomePage() {
    console.log(todos, "todos");

    return (
        <main>
            {/* {todos} */}
            <GlobalStyles themeName="coolGrey" />
            <header
                style={{
                    backgroundImage: `url('${bg}')`,
                }}
            >
                <div className="typewriter">
                    <h1>O que fazer hoje?</h1>
                </div>
                <form>
                    <input type="text" placeholder="Correr, Estudar..." />
                    <button type="submit" aria-label="Adicionar novo item">
                        +
                    </button>
                </form>
            </header>

            <section>
                <form>
                    <input
                        type="text"
                        placeholder="Filtrar lista atual, ex: Dentista"
                    />
                </form>

                <table border={1}>
                    <thead>
                        <tr>
                            <th align="left">
                                <input type="checkbox" disabled />
                            </th>
                            <th align="left">Id</th>
                            <th align="left">Conteúdo</th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {todos.map((currentTodo) => {
                            return (
                                <tr key={currentTodo.id}>
                                    {/* Aqui estou passando o id por inteiro, como id único, que é baseado na quantidade de itens da Api. */}
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>{currentTodo.id.substring(0, 5)}</td>
                                    {/* Aqui o id também é passado como único, mas cada item da Api, vai ser baseado no seu id especifico. */}
                                    <td>{currentTodo.content}</td>
                                    <td align="right">
                                        <button data-type="delete">
                                            Apagar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {/* <tr>
                            <td
                                colSpan={4}
                                align="center"
                                style={{ textAlign: "center" }}
                            >
                                Carregando...
                            </td>
                        </tr> */}

                        {/* <tr>
                            <td colSpan={4} align="center">
                                Nenhum item encontrado
                            </td>
                        </tr> */}

                        {/* <tr>
                            <td
                                colSpan={4}
                                align="center"
                                style={{ textAlign: "center" }}
                            >
                                <button data-type="load-more">
                                    Carregar mais{" "}
                                    <span
                                        style={{
                                            display: "inline-block",
                                            marginLeft: "4px",
                                            fontSize: "1.2em",
                                        }}
                                    >
                                        ↓
                                    </span>
                                </button>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default HomePage;
