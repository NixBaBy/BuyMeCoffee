import { getUsers } from "../users";

export async function checkUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const users = await getUsers();
  const user = users.find((user) => user.email === username);
  if (!user) {
    return new Response(
      JSON.stringify({ message: "user not found", error: true }),
      {
        status: 404,
      }
    );
  }
  const isCorrect = user.password === password;

  if (!isCorrect) {
    return new Response(
      JSON.stringify({ message: "password buruu bn", error: true }),
      {
        status: 404,
      }
    );
  }
  return new Response(
    JSON.stringify({ message: "amjilttai newterlee", user }),
    {
      status: 200,
    }
  );
}
