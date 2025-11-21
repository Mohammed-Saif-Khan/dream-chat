import { ExploreUserList } from "@/types/contact";
import ExploreDetail from "./contract-card";
import Heading from "./heading";

export default async function Explore({
  userList,
}: {
  userList: ExploreUserList[];
}) {
  return (
    <div>
      <Heading />
      <ExploreDetail data={userList} />
    </div>
  );
}
