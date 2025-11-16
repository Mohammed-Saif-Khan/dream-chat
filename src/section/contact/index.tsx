import { getUserContactList } from "@/services/contact";
import ContactDetail from "./contract-card";
import Heading from "./heading";

export default async function Contact() {
  const data = await getUserContactList();

  return (
    <div>
      <Heading />
      <ContactDetail data={data} />
    </div>
  );
}
