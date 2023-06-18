import { useQuery } from "@tanstack/react-query";
import { List } from "antd";

async function fetchTodoList() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
}

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList
  });

  if (isLoading) return <div>Loaidng....</div>;
  if (isError) return <div> Error...</div>;
  const Header = () => {
    return (
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 1
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            height: "20px",
            textAlign: "left"
          }}
        >
          <div style={{ width: "20%" }}>Id</div>
          <div style={{ width: "60%" }}>Title</div>
          <div style={{ width: "20%" }}>Complete</div>
        </div>
      </div>
    );
  };
  return (
    <div
      style={{
        height: "600px",
        overflow: "auto",
        border: "1px solid #EFF1F7",
        borderRadius: "8px"
      }}
    >
      <Header />
      <List
        column={2}
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                textAlign: "left"
              }}
            >
              <div style={{ width: "20%" }}>{item.id}</div>
              <div style={{ width: "60%" }}>{item.title}</div>
              <div style={{ width: "20%" }}>
                {item.complete ? "complete" : "uncomplete"}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
export default App;
