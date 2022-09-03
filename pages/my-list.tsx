import { MyLists } from "@/components/MyList/MyLists";
import { useAuth } from "@/hooks/useAuth";
import { NextPage } from "next";

type Props = {}

const MyList: NextPage<Props> = ({ }) => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
      <div className="grid grid-cols-4 gap-4">
        <MyLists
          user={user}
        />
      </div>
    </div >
  );
};

export default MyList;