import AgentCardComponent from './Childs/CardComponent';
import styles from './RequestStyle.module.css';

const RequestComponent = () => {

  const testData = [
    {
      id: 1,
      profileImage: './temp/profile.png',
      backgroundImage: './temp/background.png',
      userName: 'User 1',
      profession: 'Developer',
      cost: 1001,
      joinedDate: '20 March 2023',
      projectsCount: 57,
      experienceLevel: 'Mid-level',
      isFavourite: true
    },
    {
      id: 2,
      profileImage: './temp/profile.png',
      backgroundImage: './temp/background.png',
      userName: 'User 2',
      profession: 'Designer',
      cost: 1452,
      joinedDate: '20 March 2023',
      projectsCount: 23,
      experienceLevel: 'Junior',
      isFavourite: false
    },
    {
      id: 3,
      profileImage: './temp/profile.png',
      backgroundImage: './temp/background.png',
      userName: 'User 3',
      profession: 'Writer',
      cost: 1358,
      joinedDate: '20 March 2023',
      projectsCount: 89,
      experienceLevel: 'Senior',
      isFavourite: true
    },
    {
      id: 4,
      profileImage: './temp/profile.png',
      backgroundImage: './temp/background.png',
      userName: 'User 4',
      profession: 'Engineer',
      cost: 1047,
      joinedDate: '20 March 2023',
      projectsCount: 37,
      experienceLevel: 'Junior',
      isFavourite: false
    },
    {
      id: 5,
      profileImage: './temp/profile.png',
      backgroundImage: './temp/background.png',
      userName: 'User 5',
      profession: 'Artist',
      cost: 1536,
      joinedDate: '20 March 2023',
      projectsCount: 64,
      experienceLevel: 'Mid-level',
      isFavourite: true
    },
    {
      id: 6,
      profileImage: './temp/profile.png',
      backgroundImage: './temp/background.png',
      userName: 'User 6',
      profession: 'Developer',
      cost: 1008,
      joinedDate: '20 March 2023',
      projectsCount: 91,
      experienceLevel: 'Senior',
      isFavourite: true
    },
    {
      id: 7,
      profileImage: './temp/profile.png',
      backgroundImage: './temp/background.png',
      userName: 'User 7',
      profession: 'Writer',
      cost: 1062,
      joinedDate: '20 March 2023',
      projectsCount: 75,
      experienceLevel: 'Junior',
      isFavourite: false
    },
    {
      id: 8,
      profileImage: './temp/profile.png',
      backgroundImage: './temp/background.png',
      userName: 'User 8',
      profession: 'Designer',
      cost: 1112,
      joinedDate: '20 March 2023',
      projectsCount: 14,
      experienceLevel: 'Senior',
      isFavourite: true
    },
    {
      id: 9,
      profileImage: './temp/profile.png',
      backgroundImage: './temp/background.png',
      userName: 'User 9',
      profession: 'Developer',
      cost: 1374,
      joinedDate: '20 March 2023',
      projectsCount: 42,
      experienceLevel: 'Mid-level',
      isFavourite: false
    },
    {
      id: 10,
      profileImage: './temp/profile.png',
      backgroundImage: './temp/background.png',
      userName: 'User 10',
      profession: 'Engineer',
      cost: 1216,
      joinedDate: '20 March 2023',
      projectsCount: 68,
      experienceLevel: 'Junior',
      isFavourite: true
    }
  ];
  
  

  return (
    <div className={styles.container}>
      {testData.map((item)=> <AgentCardComponent key={item.id} data={item} />)}
    </div>
  )
}

export default RequestComponent