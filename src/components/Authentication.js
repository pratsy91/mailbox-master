import React from "react";
import { Form, redirect, useSearchParams } from "react-router-dom";
import { Button, Card, Container, Row } from "react-bootstrap";

const Authentication = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const modeHandler = () => {
    if (isLogin) {
      setSearchParams({ mode: "signup" });
    } else {
      setSearchParams({ mode: "login" });
    }
  };
  return (
    <Container
      className=" justify-content-center w-50"
      style={{ marginTop: "120px" }}
    >
      <h1 className="mb-5 offset-5 text-secondary">
        {isLogin ? "Login" : "Signup"}
      </h1>
      <Card>
        <Form method="post" className="p-5">
          <Row lg={5} className="mb-3">
            <label className="me-3">Enter Email</label>
            <input type="email" name="email" className="w-50 rounded p-2" />
          </Row>
          <Row lg={5}>
            <label className="me-3">Password</label>
            <input
              type="password"
              name="password"
              className="w-50 rounded p-2"
            />
          </Row>

          <Button className="mt-5" type="submit">
            {isLogin ? "login" : "signup"}
          </Button>

          <div className="offset-9">
            <p> {isLogin ? "Not a user?" : "Already a user?"}</p>
            <Button variant="warning" onClick={modeHandler}>
              {isLogin ? "signup" : "login"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Authentication;

export async function authAction({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  console.log(
    "🚀 ~ file: Authentication.js:65 ~ authAction ~ authData:",
    authData
  );
  let url = "";
  if (mode === "signup") {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABJQhOG42ZkgZ5qOuxKV9ng2VJxs_hraY";
  }

  if (mode === "login") {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABJQhOG42ZkgZ5qOuxKV9ng2VJxs_hraY";
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: authData.email,
      password: authData.password,
      returnSecureToken: true,
    }),
  });

  const data = await response.json();
  const token = data.idToken;
  localStorage.setItem("token", token);

  if (mode === "login") {
    return redirect("/");
  } else {
    return redirect("/auth?mode=login");
  }
}
