import UserInfoForm from "@/components/ui/users/infoForm"

export default function UserInfoPage({ params }: { params: { username: string } }) {
  return (
    <div>
      <UserInfoForm params={params} />
    </div>
  )
}