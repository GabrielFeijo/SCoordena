import UserCard from '@/components/team/user-card';
import Title from '@/components/title';
import users from '@/utils/users';

export default function Page() {
	return (
		<div>
			<Title>Team</Title>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
				{users.map((user) => (
					<UserCard
						key={user.id}
						{...user}
					/>
				))}
			</div>
		</div>
	);
}
