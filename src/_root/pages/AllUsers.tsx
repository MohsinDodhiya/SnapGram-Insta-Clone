import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/hooks/use-toast";
import { useGetUsers } from "@/lib/react-query/queryesAndMutations";

const AllUsers = () => {
  const { toast } = useToast();
  const { data: creaters, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({
      title: "Something went Wrong.",
    });
  }
  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creaters ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creaters?.documents.map((creater) => (
              <li key={creater?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creater} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
