import { Form, redirect, useActionData } from "react-router-dom";

export default function Contact() {
  // paima funkciją contactAction
  const data = useActionData();

  return (
    <div className="contact">
      <h3>Susisiekite su mumis</h3>

      <Form method="post" action="">
        <label>
          <span>Jūsų el. paštas:</span>
          <input type="email" name="email" required />
        </label>

        <label>
          <span>Jūsų žinutė:</span>
          <textarea name="message" required></textarea>
        </label>

        <button>Siųsti</button>

        {data && data.error && <p>{data.error}</p>}
      </Form>
    </div>
  );
}

export const contactAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get("email"),
    message: data.get("message"),
  };

  if (submission.message.length < 10) {
    return { error: "Žinutė turi būti ne mažiau 10 simbolių." };
  }

  return redirect("/");
};
