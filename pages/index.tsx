import React from "react";
// import { GlobalStyles } from "../src/ui/theme/GlobalStyles"
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { todoController } from "@ui/controller/todo";

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

    const [totalPages, setTotalPages] = React.useState(0);

    // Setando o estado com um valor
    const [isLoading, setIsLoading] = React.useState(true);

    console.log("totalPages", totalPages);

    const [search, setSearch] = React.useState("");

    const hasMorePages = totalPages > page; // **

    // const [initialLoadComplete, setInitialLoadComplete] = React.useState(false);

    const initialLoadComplete = React.useRef(false);

    const homeTodos = todoController.filterTodosByContent<HomeTodo>(
        search,
        todos
    );

    const [newTodoContent, setNewTodoContent] = React.useState("");

    const hasNoTodos = homeTodos.length === 0 && !isLoading;

    // setTodos(filteredTodos);

    // Load infos onload -> Carregar informações ao carregar
    // - React.useEffect(() => {}, [])
    // - Roda no LOAD do componente
    React.useEffect(() => {
        console.log("initialLoadComplete", initialLoadComplete.current);

        // setInitialLoadComplete(true);

        if (!initialLoadComplete.current) {
            console.log("Aqui", page); // P -> 3:48* -> 6:31
            // Quando ele tiver terminado
            todoController
                .get({ page })
                .then(({ todos, pages }) => {
                    setTodos(todos);
                    setTotalPages(pages);
                })
                .finally(() => {
                    setIsLoading(false);
                    initialLoadComplete.current = true;
                });
        }
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
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        // Tem que pelo menos passar objeto aqui, e tem que ter o content
                        // Aqui está resgatando o content.
                        todoController.create({
                            content: newTodoContent,
                            // Exemplo: De controlador em views:
                            onSuccess(todo: HomeTodo) {
                                setTodos((oldTodos) => {
                                    return [todo, ...oldTodos];
                                });
                                setNewTodoContent("");
                            },
                            onError() {
                                alert(
                                    "Voce precisa de ter um conteudo para criar uma TODO!!!"
                                );
                            },
                        });
                    }}
                >
                    <input
                        type="text"
                        placeholder="Correr, Estudar..."
                        value={newTodoContent}
                        onChange={function newTodoHandler(event) {
                            // Passando o content para o state da página
                            // console.log(event.target.value);
                            // Parei -> 06:38*
                            setNewTodoContent(event.target.value);
                        }}
                    />
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
                        // Função que o react recomenda para fazer operações de mundaças de operação no elemento.
                        onChange={function handlerSearch(event) {
                            console.log("Change!", event.target.value);
                            setSearch(event.target.value);
                        }}
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
                        {homeTodos.map((todos) => {
                            return (
                                <tr key={todos.id}>
                                    {/* Aqui estou passando o id por inteiro, como id único, que é baseado na quantidade de itens da Api. */}
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>{todos.id.substring(0, 5)}</td>
                                    {/* Aqui o id também é passado como único, mas cada item da Api, vai ser baseado no seu id especifico. */}
                                    <td>{todos.content}</td>
                                    <td align="right">
                                        <button data-type="delete">
                                            Apagar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {isLoading && (
                            <tr>
                                <td
                                    colSpan={4}
                                    align="center"
                                    style={{ textAlign: "center" }}
                                >
                                    Carregando...
                                </td>
                            </tr>
                        )}

                        {hasNoTodos && (
                            <tr>
                                <td colSpan={4} align="center">
                                    Nenhum item encontrado
                                </td>
                            </tr>
                        )}

                        {/* Se isso for true, vai mostrar, o que deverá mostra: */}
                        {hasMorePages && (
                            <tr>
                                <td
                                    colSpan={4}
                                    align="center"
                                    style={{ textAlign: "center" }}
                                >
                                    <button
                                        data-type="load-more"
                                        onClick={() => {
                                            setIsLoading(true);
                                            const nextPage = page + 1;
                                            setPage(nextPage);

                                            todoController
                                                .get({ page: nextPage })
                                                .then(({ todos, pages }) => {
                                                    setTodos((oldTodos) => {
                                                        return [
                                                            ...oldTodos,
                                                            ...todos,
                                                        ]; // Parei 7:54
                                                    });
                                                    setTotalPages(pages);
                                                })
                                                .finally(() => {
                                                    setIsLoading(false);
                                                });
                                        }}
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
                        )}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default HomePage;
