import React from "react";
// import { GlobalStyles } from "../src/ui/theme/GlobalStyles"
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { todoController } from "@ui/controller/todo";
import todos from "./api/todos";

const bg = "./bg.jpg"; // inside public folder

// const todos = [];

interface HomeTodo {
    id: string;
    content: string;
}

function HomePage() {
    // console.log(todos, "todos");

    // Estado da página - Paginação
    const [page, setPage] = React.useState(1);

    const [todos, setTodos] = React.useState<HomeTodo[]>([]);

    // Load infos onload -> Carregar informações ao carregar
    React.useEffect(() => {
        // Quando ele tiver terminado
        todoController.get({ page }).then(({ todos }) => {
            console.log(todos, "AAA");

            setTodos(todos);
        });
    }, []);

    // console.log("TODOS", fetch("http://localhost:3002/api/todos"));

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

                        <tr>
                            <td
                                colSpan={4}
                                align="center"
                                style={{ textAlign: "center" }}
                            >
                                <button
                                    data-type="load-more"
                                    onClick={() => setPage(page + 1)}
                                >
                                    Página {page}, Carregar mais{""}
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
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default HomePage;
