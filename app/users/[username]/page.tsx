import UserInfoForm from "@/components/ui/users/infoForm";

export default function UserInfoPage({ params }: { params: { username: string } }) {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Employees</h1>
        <h4 className="text-sm text-gray-400">Employees / Details</h4>
      </div>
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <UserInfoForm params={params} />
      </div>
    </div>
  );
}
