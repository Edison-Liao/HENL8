import { sayHello } from "./ts/greet";
import { loginModel } from "./ts/login";
import { userAdmin } from "./ts/userAdmin";
function showHello(divName: string, name: string) {
  // const elt = document.getElementById(divName);
  // elt.innerText = sayHello(name);
  console.log("sayHelloMytype");
}

showHello("myfistTS", "holle2323123");
loginModel.events();
