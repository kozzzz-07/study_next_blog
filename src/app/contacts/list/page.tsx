import { getContact, getContacts } from "../_query/contact";

export default async function ListPage() {
  const contacts = await getContacts();
  const first = await getContact("cmd77bzaq00010fxpwdxx3e6l");

  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.id} | {contact.name} | {contact.email}
          </li>
        ))}
      </ul>
      <hr />
      {first?.name} | {first?.email}
    </div>
  );
}
