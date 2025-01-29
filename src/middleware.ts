import { auth } from "@/lib/auth";

export default auth((request) => {
  console.log("rodou");
});

export const config = {
  matcher: ["/login", "/register", "/dash", "/dash/:path"],
};
