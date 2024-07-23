import TodoApp from "./App/TodoApp.js";

document.addEventListener("DOMContentLoaded", ()=>{

  try {
    const app = new TodoApp();
  } catch (error) {
    const e = error as Error;
    console.log("Application faced an error " + e.name + " " + e.message);
  }
});
