import { hashPassword } from "./auth";

export async function createUser(user) {
  const response = await fetch(
    "https://authentication-with-next-default-rtdb.firebaseio.com/users.json",
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function getUserHasExist(email) {
  const response = await fetch(
    "https://authentication-with-next-default-rtdb.firebaseio.com/users.json"
  )
    .then((res) => res.json())
    .then((data) => data);
  const users = [];
  for (const key in response) {
    users.push({ id: key, user: response[key] });
  }
  const exist = users.find((user) => user.user.email === email);
  return exist;
}

export async function changePasswordUser(newPassword, id) {
  const hasPassword = await hashPassword(newPassword);
  const response = await fetch(
    `https://authentication-with-next-default-rtdb.firebaseio.com/users/${id}.json`,
    {
      method: "PATCH",
      body: JSON.stringify({ password: hasPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
}
