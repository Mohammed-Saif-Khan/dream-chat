import { getUserExploreList } from "@/services/explore";
import ExploreDetail from "./contract-card";
import Heading from "./heading";

export default async function Explore() {
  const data = await getUserExploreList();

  return (
    <div>
      <Heading />
      <ExploreDetail data={data} />
    </div>
  );
}
