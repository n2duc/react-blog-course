import Button from '../../components/Button/Button'
import DashboardHeading from '../dashboard/DashboardHeading'
import UserTable from './UserTable'

const UserManage = () => {
    return (
        <div>
            <DashboardHeading title="Users" desc="Manage users">
                <Button kind="ghost" height="50px" to="/manage/add-user">Create User</Button>
            </DashboardHeading>
            <UserTable></UserTable>
        </div>
    )
}

export default UserManage